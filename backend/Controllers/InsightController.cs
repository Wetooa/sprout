using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace backend
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsightController : ControllerBase
    {
        [HttpPost("GenerateInsights")]
        public async Task<IActionResult> GenerateInsights([FromBody] ImageRequest imageRequest)
        {
            if (string.IsNullOrEmpty(imageRequest?.ImageUrl))
            {
                return BadRequest(new { Result = "Error: 'imageUrl' parameter is required." });
            }

            string endpoint = "https://sproutinsights2.cognitiveservices.azure.com/";
            string apiKey =
                "4jJ02ZVhT8sqqPk88zDLYQyEdDmZDVvqgNKob9K8LLuQlQan4AiTJQQJ99ALACYeBjFXJ3w3AAAFACOGaNCs";

            try
            {
                string analysisResult = await AnalyzeImageAsync(imageRequest.ImageUrl, endpoint, apiKey);
                return Ok(new { Result = analysisResult });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Result = $"Error: {ex.Message}" });
            }
        }

        private async Task<string> AnalyzeImageAsync(
            string imageUrl,
            string endpoint,
            string apiKey
        )
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                client.BaseAddress = new Uri(endpoint);

                var requestBody = new { url = imageUrl };
                var content = new StringContent(
                    JObject.FromObject(requestBody).ToString(),
                    Encoding.UTF8,
                    "application/json"
                );

                string uri =
                    "/vision/v3.2/analyze?visualFeatures=Description,Tags,Objects,Color,Categories";
                HttpResponseMessage response = await client.PostAsync(uri, content);

                if (!response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException(
                        $"Response status code: {response.StatusCode}, Body: {responseBody}"
                    );
                }

                string responseBodySuccess = await response.Content.ReadAsStringAsync();
                dynamic analysis = JObject.Parse(responseBodySuccess);

                var color = analysis.color;
                var tags = analysis.tags;

                return GenerateFarmInsight(color, tags);
            }
        }

        private string GenerateFarmInsight(dynamic color, dynamic tags)
        {
            string insight = "The field is looking good!";

            if (color != null && color.dominantColors != null)
            {
                List<string> normalizedColors = new List<string>();
                foreach (var dominantColor in color.dominantColors)
                {
                    normalizedColors.Add(dominantColor.ToString().Trim().ToLower());
                }

                if (normalizedColors.Contains("yellow"))
                {
                    insight =
                        "The field might be stressed. Consider watering the areas showing yellow.";
                }
                if (normalizedColors.Contains("red"))
                {
                    insight =
                        "The field is extremely stressed. Investigate the area and check irrigation, fertilizer, or pests.";
                }
                if (normalizedColors.Contains("green"))
                {
                    insight =
                        "The field appears healthy with good vegetation coverage. Continue monitoring growth.";
                }
            }

            if (tags != null && tags.Count > 0)
            {
                foreach (var tag in tags)
                {
                    string tagName = tag.name.ToString().ToLower();
                    if (tagName.Contains("ndvi"))
                    {
                        insight +=
                            " NDVI analysis suggests monitoring the vegetation health closely.";
                    }
                    if (tagName.Contains("stressed vegetation"))
                    {
                        insight +=
                            " Stressed vegetation detected. Investigate water, nutrient, or pest-related issues.";
                    }
                }
            }

            return insight;
        }
    }

    public class ImageRequest
    {
        public string ImageUrl { get; set; }
    }

using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace backend
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsightController : ControllerBase
    {
        // POST api/Insight/GenerateInsights
        [HttpPost("GenerateInsights")]
        public async Task<IActionResult> GenerateInsights([FromForm] IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Process the image (save, send to a service, etc.)
            var filePath = Path.Combine("path-to-save-image", image.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            // Assuming you process the image and generate insights
            var insights = "Generated Insights"; // Replace with actual insights generation logic
            return Ok(new { result = insights });
        }


        private async Task<string> AnalyzeImageAsync(IFormFile imageFile, string endpoint, string apiKey)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", apiKey);
                client.BaseAddress = new Uri(endpoint);

                var uri = "/vision/v3.2/analyze?visualFeatures=Description,Tags,Objects,Color,Categories";

                using (var content = new MultipartFormDataContent())
                {
                    var fileContent = new StreamContent(imageFile.OpenReadStream());
                    fileContent.Headers.ContentType = new MediaTypeHeaderValue(imageFile.ContentType);
                    content.Add(fileContent, "file", imageFile.FileName);

                    HttpResponseMessage response = await client.PostAsync(uri, content);

                    if (!response.IsSuccessStatusCode)
                    {
                        string responseBody = await response.Content.ReadAsStringAsync();
                        throw new HttpRequestException($"Response status code: {response.StatusCode}, Body: {responseBody}");
                    }

                    string responseBodySuccess = await response.Content.ReadAsStringAsync();
                    dynamic analysis = JObject.Parse(responseBodySuccess);

                    var color = analysis.color;
                    var tags = analysis.tags;

                    return GenerateFarmInsight(color, tags);
                }
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
                    insight = "The field might be stressed. Consider watering the areas showing yellow.";
                }
                if (normalizedColors.Contains("red"))
                {
                    insight = "The field is extremely stressed. Investigate the area and check irrigation, fertilizer, or pests.";
                }
                if (normalizedColors.Contains("green"))
                {
                    insight = "The field appears healthy with good vegetation coverage. Continue monitoring growth.";
                }
            }

            if (tags != null && tags.Count > 0)
            {
                foreach (var tag in tags)
                {
                    string tagName = tag.name.ToString().ToLower();
                    if (tagName.Contains("ndvi"))
                    {
                        insight += " NDVI analysis suggests monitoring the vegetation health closely.";
                    }
                    if (tagName.Contains("stressed vegetation"))
                    {
                        insight += " Stressed vegetation detected. Investigate water, nutrient, or pest-related issues.";
                    }
                }
            }

            return insight;
        }
    }
}

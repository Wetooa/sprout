namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                Application app = new Application();
                app.Run();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Application failed to start: {ex.Message}");
                throw;
            }
        }
    }
}

namespace backend
{
    public class Insight
    {
        public required int Id { get; set; }
        public required int OwnerId { get; set; }

        public required string Content { get; set; }

        public required DateTime CreatedAt { get; set; }
    }
}

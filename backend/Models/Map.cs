namespace backend
{
    public class Map
    {
        public required int Id { get; set; }
        public required int OwnerId { get; set; }

        public required string Name { get; set; }
        public required string Filter { get; set; }
        public required string MapStyle { get; set; }

        public required DateTime CreatedAt { get; set; }
        public required DateTime? UpdatedAt { get; set; }
    }
}

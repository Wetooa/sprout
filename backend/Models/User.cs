
namespace backend
{
    public class User
    {
        public int Id { get; set; }

        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }

        public required string Password { get; set; }

        public required string SubscriptionTier {get; set;}

        public required DateTime CreatedAt {get; set;}
    }
}

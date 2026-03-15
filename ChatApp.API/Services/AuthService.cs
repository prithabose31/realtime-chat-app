using BCrypt.Net;

public class AuthService
{
    public string HashPassword(string password)
    {
        return BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Verify(password, hash);
    }
}

using System;
using webspec3.Services.Impl;
using Xunit;

namespace webspec3Tests
{
    /// <summary>
    /// M. Narr
    /// </summary>
    public sealed class HMACSHA512PasswordServiceTest
    {
        [Fact]
        public void CorrectPasswordTest()
        {
            var passwordService = new HMACSHA512PasswordService();

            var password = passwordService.HashPassword("test");
            Assert.NotNull(password);

            var correct = passwordService.CheckPassword("test", password);
            Assert.True(correct);
        }

        [Fact]
        public void WrongPasswordTest()
        {
            var passwordService = new HMACSHA512PasswordService();

            var password = passwordService.HashPassword("test");
            Assert.NotNull(password);

            var correct = passwordService.CheckPassword("test2", password);
            Assert.False(correct);
        }

        [Fact]
        public void EmptyPasswordHashTest()
        {
            var passwordService = new HMACSHA512PasswordService();

            Assert.Throws<ArgumentException>(() =>
            {
                passwordService.HashPassword(null);
            });
        }

        [Fact]
        public void EmptyPasswordCheckTest()
        {
            var passwordService = new HMACSHA512PasswordService();

            Assert.Throws<ArgumentException>(() =>
            {
                passwordService.CheckPassword(null, "asfdasdfas");
            });
        }

        [Fact]
        public void EmptyHashCheckTest()
        {
            var passwordService = new HMACSHA512PasswordService();

            Assert.Throws<ArgumentException>(() =>
            {
                passwordService.CheckPassword("test", null);
            });
        }
    }
}

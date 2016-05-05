using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TDemo.Startup))]
namespace TDemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

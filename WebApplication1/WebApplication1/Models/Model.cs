using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Model : DbContext
    {
        public Model(DbContextOptions<Model> options) : base(options)
        {
                
        }

        public DbSet<Pizzeria> Pizzeria { get; set; }

    }

    public class Pizzeria
    {
        public int id {get; set;}
        public string nombre { get; set; }
        public string ingredientes { get; set; }
        public double precio { get; set; }
        public byte[] foto { get; set; }
    }
}

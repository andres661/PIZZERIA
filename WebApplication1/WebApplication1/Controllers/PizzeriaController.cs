using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.Response;
using WebApplication1.Models.ViewModels;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class PizzeriaController : Controller
    {
        private Models.Model db;

        public PizzeriaController(Models.Model context)
        {
            db = context;
        }
        [HttpGet("[action]")]

        public IEnumerable<Componentes> Index()
        {

            List<Componentes> lis = (from d in db.Pizzeria
                                     select new Componentes
                                     {
                                         id = d.id,
                                         nombre = d.nombre,
                                         ingredientes = d.ingredientes,
                                         precio = d.precio,
                                         foto = d.foto
                            
                                     }).ToList();

            return lis;
        }
        [HttpPost("[action]")]

        public response add([FromBody] Componentes Pizzeria)
        {
             response obj = new response();
            
            try
            {
                
                Models.Pizzeria pizza = new Models.Pizzeria();
                

                pizza.nombre = Pizzeria.nombre;
                pizza.ingredientes = Pizzeria.ingredientes;
                pizza.precio = Pizzeria.precio;
                pizza.foto = Pizzeria.foto;
                
                db.Pizzeria.Add(pizza);
                db.SaveChanges();
                obj.exitoso = 1;
            }
            catch (Exception ex)
            {
                obj.exitoso = 0;
                obj.Mensaje = ex.InnerException.Message;
            }

            return obj;


        }

        [HttpPut("[action]")]
        public response Update([FromBody] Componentes Pizzeria)
        {
            response obj = new response();


            try
            {

                Models.Pizzeria pizza = new Models.Pizzeria();

                pizza.id = Pizzeria.id;
                pizza.nombre = Pizzeria.nombre;
                pizza.ingredientes = Pizzeria.ingredientes;
                pizza.precio = Pizzeria.precio;
                pizza.foto = Pizzeria.foto;

                db.Entry(pizza).State = EntityState.Modified;
                db.SaveChanges();
                obj.exitoso = 1;
            }
            catch (Exception ex)
            {
                obj.exitoso = 0;
                obj.Mensaje = ex.InnerException.Message;
            }

            return obj;
        }

    }
}
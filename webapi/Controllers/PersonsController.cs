using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Database;
using Microsoft.AspNetCore.Authorization;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PersonController : ControllerBase
    {
        private readonly SchoolContext _dbContext;

        public PersonController(SchoolContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<Person>> GetAllPersons()
        {
            return Ok(_dbContext.Person.ToList());
            //return Ok(_dbContext.Person.Include(p => p.Student).ToList());
        }

        [HttpGet("{personId}")]
        public ActionResult<Person> GetPerson(int personId)
        {
            var person = _dbContext.Person
                .SingleOrDefault(p => p.PersonId == personId);

            if (person != null) {
                return person;
            } else {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult<Person> AddPerson(Person person)
        {
            _dbContext.Person.Add(person);
            _dbContext.SaveChanges();

            // return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);

            return StatusCode(Microsoft.AspNetCore.Http.StatusCodes.Status201Created);
        }

        [HttpDelete("{personId}")]
        public ActionResult DeletePerson(int personId)
        {
            var person = new Person { PersonId = personId };

            _dbContext.Person.Attach(person);
            _dbContext.Person.Remove(person);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpPut("{personId}")]
        public ActionResult UpdatePerson(int personId, Person personUpdate)
        {
            var person = _dbContext.Person
                .SingleOrDefault(p => p.PersonId == personId);

            if (person != null)
            {
                person.FirstName = personUpdate.FirstName;
                person.MiddleName = personUpdate.MiddleName;
                person.LastName = personUpdate.LastName;

                _dbContext.Update(person);

                _dbContext.SaveChanges();
            }

            return NoContent();
        }
    }
}
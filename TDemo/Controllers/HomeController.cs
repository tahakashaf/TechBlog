using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDemo.Models;
namespace TDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetAllPatients()
        {
            return View("ViewAllPatients");
        }

        public JsonResult GetCountries()
        {
            using (TDemoEntities context = new TDemoEntities())
            {
                var ret = context.Countries.Select(x => new { x.CountryId, x.CountryName }).ToList();
                return Json(ret, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult GetStates(int countryId)
        {
            using (TDemoEntities context = new TDemoEntities())
            {
                var ret = context.States.Where(x => x.Country == countryId).Select(x => new { x.StateId, x.StateName }).ToList();
                return Json(ret);
            }
        }



        [HttpPost]
        public void Save(Patient patient)
        {
            try
            {
                using (TDemoEntities _Context = new TDemoEntities())
                {

                    //Patient patienttobesaved = new Patient();
                    //patienttobesaved.FirstName = patient.FirstName;
                    //patienttobesaved.LastName = patient.LastName;
                    //patienttobesaved.DateOfBirth = patient.DateOfBirth;
                    //patienttobesaved.Gender = patient.Gender;
                    //patienttobesaved.Country = patient.Country;
                    //patienttobesaved.State = patient.State;
                    //_Context.Patients.Add(patienttobesaved);
                    _Context.Patients.Add(patient);
                    _Context.SaveChanges();
                }


            }
            catch (Exception exc)
            {

            }




        }


        [HttpGet]
        public JsonResult GetAll()
        {
            using (TDemoEntities context = new TDemoEntities())
            {

                List<Patientvm> patients = new List<Patientvm>();

                patients = context.Patients.Select(s => new Patientvm

                {
                    PatientId = s.PatientId,
                    FirstName = s.FirstName,
                    LastName = s.LastName,
                    DateOfBirth = s.DateOfBirth,
                    Gender = s.Gender,
                    Country = s.Country1.CountryName,
                    State = s.State1.StateName


                }).ToList();
                return Json(patients, JsonRequestBehavior.AllowGet);

            }

        }


    }
    public class Patientvm
    {
        public long PatientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Country { get; set; }
        public string State { get; set; }


    }
}
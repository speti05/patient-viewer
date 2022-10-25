import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Patient } from 'src/app/types/patient';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const patients = [
      {
        "id": 0,
        "name": "Mcintosh Preston",
        "gender": "male",
        "dateOfBirth": "1984-03-23"
      },
      {
        "id": 1,
        "name": "Katharine Turner",
        "gender": "female",
        "dateOfBirth": "1992-05-16"
      },
      {
        "id": 2,
        "name": "Erna Hernandez",
        "gender": "female",
        "dateOfBirth": "1986-06-05"
      },
      {
        "id": 3,
        "name": "Alberta Mosley",
        "gender": "female",
        "dateOfBirth": "1992-07-20"
      },
      {
        "id": 4,
        "name": "Dyer Gilliam",
        "gender": "male",
        "dateOfBirth": "1992-04-30"
      },
      {
        "id": 5,
        "name": "Verna Allen",
        "gender": "female",
        "dateOfBirth": "1983-12-15"
      },
      {
        "id": 6,
        "name": "Sheryl Henry",
        "gender": "female",
        "dateOfBirth": "1982-05-22"
      },
      {
        "id": 7,
        "name": "Sabrina Villarreal",
        "gender": "female",
        "dateOfBirth": "1994-07-30"
      },
      {
        "id": 8,
        "name": "Whitaker Ward",
        "gender": "male",
        "dateOfBirth": "1980-03-02"
      },
      {
        "id": 9,
        "name": "Hensley Meadows",
        "gender": "male",
        "dateOfBirth": "1987-06-27"
      },
      {
        "id": 10,
        "name": "Moody Richard",
        "gender": "male",
        "dateOfBirth": "1993-05-07"
      },
      {
        "id": 11,
        "name": "Debora Kerr",
        "gender": "female",
        "dateOfBirth": "1981-02-10"
      },
      {
        "id": 12,
        "name": "Irwin Johnston",
        "gender": "male",
        "dateOfBirth": "1984-05-23"
      },
      {
        "id": 13,
        "name": "Michael Jensen",
        "gender": "male",
        "dateOfBirth": "1990-02-09"
      },
      {
        "id": 14,
        "name": "Powell Roth",
        "gender": "male",
        "dateOfBirth": "1984-01-08"
      },
      {
        "id": 15,
        "name": "Michelle Crawford",
        "gender": "female",
        "dateOfBirth": "1985-02-18"
      },
      {
        "id": 16,
        "name": "Jenifer Lyons",
        "gender": "female",
        "dateOfBirth": "1990-08-03"
      },
      {
        "id": 17,
        "name": "Doyle Abbott",
        "gender": "male",
        "dateOfBirth": "1980-08-15"
      },
      {
        "id": 18,
        "name": "Keri England",
        "gender": "female",
        "dateOfBirth": "1993-12-18"
      },
      {
        "id": 19,
        "name": "Jeanie Craig",
        "gender": "female",
        "dateOfBirth": "1985-06-13"
      },
      {
        "id": 20,
        "name": "Fisher Woodard",
        "gender": "male",
        "dateOfBirth": "1980-03-12"
      },
      {
        "id": 21,
        "name": "Cecile Mosley",
        "gender": "female",
        "dateOfBirth": "1986-04-26"
      },
      {
        "id": 22,
        "name": "Sonya Briggs",
        "gender": "female",
        "dateOfBirth": "1988-12-13"
      },
      {
        "id": 23,
        "name": "Cantu Gay",
        "gender": "male",
        "dateOfBirth": "1993-07-15"
      },
      {
        "id": 24,
        "name": "Goldie Odom",
        "gender": "female",
        "dateOfBirth": "1983-10-02"
      },
      {
        "id": 25,
        "name": "Conway Fitzgerald",
        "gender": "male",
        "dateOfBirth": "1984-06-02"
      },
      {
        "id": 26,
        "name": "Ruiz Barnett",
        "gender": "male",
        "dateOfBirth": "1981-12-06"
      },
      {
        "id": 27,
        "name": "Catalina York",
        "gender": "female",
        "dateOfBirth": "1984-09-21"
      },
      {
        "id": 28,
        "name": "Maribel Mcclure",
        "gender": "female",
        "dateOfBirth": "1988-05-21"
      },
      {
        "id": 29,
        "name": "Beulah Maldonado",
        "gender": "female",
        "dateOfBirth": "1987-09-03"
      },
      {
        "id": 30,
        "name": "Mcbride Wells",
        "gender": "male",
        "dateOfBirth": "1992-03-20"
      },
      {
        "id": 31,
        "name": "Odom Gamble",
        "gender": "male",
        "dateOfBirth": "1984-06-15"
      },
      {
        "id": 32,
        "name": "Owens Wong",
        "gender": "male",
        "dateOfBirth": "1987-09-11"
      },
      {
        "id": 33,
        "name": "Olga Logan",
        "gender": "female",
        "dateOfBirth": "1988-05-09"
      },
      {
        "id": 34,
        "name": "Alvarado James",
        "gender": "male",
        "dateOfBirth": "1984-02-13"
      },
      {
        "id": 35,
        "name": "Hammond Reese",
        "gender": "male",
        "dateOfBirth": "1989-10-27"
      },
      {
        "id": 36,
        "name": "House Robbins",
        "gender": "male",
        "dateOfBirth": "1981-05-13"
      },
      {
        "id": 37,
        "name": "Mcmillan Mcdonald",
        "gender": "male",
        "dateOfBirth": "1987-12-10"
      },
      {
        "id": 38,
        "name": "Donovan Fowler",
        "gender": "male",
        "dateOfBirth": "1983-10-26"
      },
      {
        "id": 39,
        "name": "Bernard Case",
        "gender": "male",
        "dateOfBirth": "1984-02-16"
      },
      {
        "id": 40,
        "name": "Deena Roy",
        "gender": "female",
        "dateOfBirth": "1985-05-16"
      },
      {
        "id": 41,
        "name": "Miranda Schultz",
        "gender": "female",
        "dateOfBirth": "1983-11-26"
      },
      {
        "id": 42,
        "name": "Aileen Odom",
        "gender": "female",
        "dateOfBirth": "1993-08-04"
      },
      {
        "id": 43,
        "name": "Schneider Gilliam",
        "gender": "male",
        "dateOfBirth": "1984-10-15"
      },
      {
        "id": 44,
        "name": "Virginia Becker",
        "gender": "female",
        "dateOfBirth": "1982-01-05"
      },
      {
        "id": 45,
        "name": "Wiggins Hampton",
        "gender": "male",
        "dateOfBirth": "1980-01-28"
      },
      {
        "id": 46,
        "name": "Ramona Byers",
        "gender": "female",
        "dateOfBirth": "1992-04-17"
      },
      {
        "id": 47,
        "name": "Waters Potts",
        "gender": "male",
        "dateOfBirth": "1994-01-01"
      },
      {
        "id": 48,
        "name": "Osborn Bradley",
        "gender": "male",
        "dateOfBirth": "1989-11-01"
      },
      {
        "id": 49,
        "name": "Bond Bonner",
        "gender": "male",
        "dateOfBirth": "1987-06-12"
      },
      {
        "id": 50,
        "name": "Elnora Porter",
        "gender": "female",
        "dateOfBirth": "1988-08-03"
      },
      {
        "id": 51,
        "name": "Sexton Oneal",
        "gender": "male",
        "dateOfBirth": "1988-07-20"
      },
      {
        "id": 52,
        "name": "Bolton Logan",
        "gender": "male",
        "dateOfBirth": "1993-05-19"
      },
      {
        "id": 53,
        "name": "Dorothea Cooke",
        "gender": "female",
        "dateOfBirth": "1980-01-06"
      },
      {
        "id": 54,
        "name": "Gloria Duffy",
        "gender": "female",
        "dateOfBirth": "1994-02-08"
      },
      {
        "id": 55,
        "name": "Kinney Shaw",
        "gender": "male",
        "dateOfBirth": "1991-03-28"
      },
      {
        "id": 56,
        "name": "Nicole Hughes",
        "gender": "female",
        "dateOfBirth": "1990-06-03"
      },
      {
        "id": 57,
        "name": "Arline Vinson",
        "gender": "female",
        "dateOfBirth": "1993-07-10"
      },
      {
        "id": 58,
        "name": "Elsa Davenport",
        "gender": "female",
        "dateOfBirth": "1987-09-18"
      },
      {
        "id": 59,
        "name": "Sharpe Talley",
        "gender": "male",
        "dateOfBirth": "1988-05-06"
      }
    ];
    return {patients};
  }

  // Overrides the genId method to ensure that a patient always has an id.
  // If the patients array is empty,
  // the method below returns the initial number (11).
  // if the patients array is not empty, the method below returns the highest
  // patient id + 1.
  genId(patients: Patient[]): number {
    return patients.length > 0 ? Math.max(...patients.map(patient => patient.id)) + 1 : 11;
  }
}
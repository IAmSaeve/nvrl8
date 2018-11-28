
import * as cors from "cors";
import * as express from "express";
import axios, {AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import { Leg } from "../js/leg";
import { Trip } from "../js/trip";

const ulist: HTMLUListElement = document.getElementById("ulist") as HTMLUListElement;
const node = document.createElement("li") as HTMLLIElement;
const span = document.createElement("span") as HTMLSpanElement;
const GetAButton: HTMLButtonElement = document.getElementById("GetAButton") as HTMLButtonElement;

// var router = express.Router();
const options: cors.CorsOptions = {
  allowedHeaders: "*",
  credentials: true,
  methods: "*",
  origin: "*",
  preflightContinue: false,

};
const router = express.Router();
router.use(cors(options));

const url  = "http://xmlopen.rejseplanen.dk/bin/rest.exe/trip?originId=8600617" +
            "&destCoordX=12565562&destCoordY=55673063&destCoordName=K%C3%B8benhavn%20H&date=28.11.18" +
            "&time=10:58&useBus=0&format=json";
const xhr  = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.setRequestHeader("X-GET", "GET");
xhr.onload = () => {
    const TripArray: Trip[] = JSON.parse(xhr.responseText);
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.table(TripArray);
    } else {
        console.error(TripArray);
    }
};
xhr.send(null);

// Import stop locations.
// import * as data from "../Data/stops.json";
// const stopArray: IStop[] = data.default as IStop[];
// console.log(stopArray);

function onSignIn(googleUser: any) {
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    window.location.href = "http://localhost:3000/profil.htm";
  }

interface IStop {
  stop_id: string;
  stop_code: string;
  stop_name: string;
  stop_desc: string;
  stop_lat: string;
  stop_lon: string;
  location_type: string;
  parent_station: string;
}

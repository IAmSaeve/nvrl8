import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import {autocomplete } from "../js/autocomplete";
import { Leg } from "../js/leg";
import { Trip } from "../js/trip";

// Import stop locations.
import * as data from "../Data/stops.json";
const stopArray: IStop[] = data.default as IStop[];
const stringArray: string[] = new Array();
stopArray.forEach((e) => {
  stringArray.push(e.stop_name);

});
console.log(stringArray.length);
interface ITripList {
    TripList: Trip[];
}

interface IITripList {
    TripList: ITripList;
}

const date: Date = new Date();
const today: string = date.getDate() + "." +
    (date.getMonth() + 1) + "." +
    (date.getFullYear().toString().split("20")[1]);
console.log(today);

// const uri  = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/trip?originId=8600617" +
//           "&destCoordX=12565562&destCoordY=55673063&destCoordName=K%C3%B8benhavn%20H&date=" + today +
//          "&time=10:58&useBus=0&format=json";

const uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk" +
    "/bin/rest.exe/trip?originId=8600617&destId=8600696&date=29.11.18&time=12:30&useBus=0&format=json";

document.getElementById("TripButton").addEventListener("click", GetTripsAxios);

function GetTripsAxios(): void {
    document.getElementById("TripList").innerHTML = "";
    axios.get<ITripList[]>(uri, {
        headers: {
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
        },
    })
        .then((response: AxiosResponse<any>) => {
            const tlist: any = response.data;
            const array: Trip[] = tlist.TripList.Trip as Trip[];
            console.log(array);
            array.forEach((element: Trip) => {
                const node = document.createElement("li");
                const legArray: Leg[] = element.Leg as Leg[];
                console.log(legArray);
                element.Leg.forEach((e) => {
                    const legNode = document.createElement("li");
                    legNode.appendChild(document.createTextNode(`Name : ${e.name}, Type : ${e.type},
                                  Origin : ${e.Origin.name}, Kl : ${e.Origin.time},
                                   Destination : ${e.Destination.name},
                                  Kl : ${e.Destination.time}`));
                    node.appendChild(legNode);
                });
                let txt: string = ``;
                if (element.cancelled !== undefined) {
                    txt += ` Cancelled : ${element.cancelled}`;
                }
                if (element.alternative !== undefined) {
                    txt += ` Alternative : ${element.alternative}`;
                }
                if (element.valid !== undefined) {
                    txt += ` Valid : ${element.valid}`;
                }
                const txtNode = document.createTextNode(txt);
                node.appendChild(txtNode);
                document.getElementById("TripList").append(node);
                console.log(element);
            });
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
        .then(() => {
            // always executed
        });
}

let content:HTMLDivElement =<HTMLDivElement>document.getElementById("content");
let profilNav: HTMLButtonElement = <HTMLButtonElement>document.getElementById("profilNav");
let afgangNav: HTMLButtonElement = <HTMLButtonElement>document.getElementById("afgangNav");
let alarmNav: HTMLButtonElement = <HTMLButtonElement>document.getElementById("alarmNav");
let logNav: HTMLButtonElement = <HTMLButtonElement>document.getElementById("logNav");
let signOutA:HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("signOutA");
let logInDiv:HTMLDivElement = <HTMLDivElement>document.getElementById("logInDiv");

if (!onSignIn) {
  GetLoginPage();
} else if (onSignIn) {
  GetProfilePage();
}
let content = document.getElementById("profilbody");
let profilNav:HTMLButtonElement = <HTMLButtonElement>document.getElementById("profilNav");
profilNav.addEventListener('click', GetProfilePage);

function GetLoginPage(): void {
    // OPRETTER HTML TIL LOGIN
    let html = "";
    html = "<header class='container fluid col-lg-12'>";
    html += "<div class='col-lg-6'>";
    html += "<h1 class='color'>Nvr<span class='forsent'>L8</span></h1>";
    html += "</div></header>";
    html += "<form class='col-lg-4 offset-lg-5 formcontainer'>";
    html += "<div class='g-signin2' data-onsuccess='onSignIn'></div>";

    content.innerHTML = html;
}

function GetProfilePage(): void {

      // OPRETTER ALLE ELEMENTER
      // BODY
      const profilBody = document.getElementById("profilbody");

      // HEADER
      const profilHeader = document.createElement("header");
      profilHeader.className = "container fluid col-lg-12";
      const profilDivHeader = document.createElement("div");
      profilDivHeader.className = "col-lg-6";
      const profilHeaderH1 = document.createElement("h1");
      profilHeaderH1.className = "color headerh1";
      profilHeaderH1.innerHTML = "NvrL8";
      const profilHeaderH1Span = document.createElement("span");

      // NAVIGATION
      const profilUl = document.createElement("ul");
      profilUl.className = "nav flex-column col-lg-1";
      profilUl.id = "navbackground";
      const profilNavItemLi = document.createElement("li");
      profilNavItemLi.className = "nav-item";
      const afgangNavItemLi = document.createElement("li");
      afgangNavItemLi.className = "nav-item";
      const alarmNavItemLi = document.createElement("li");
      alarmNavItemLi.className = "nav-item";
      const logNavItemLi = document.createElement("li");
      logNavItemLi.className = "nav-item";
      const profilNavItemA = document.createElement("button");
      profilNavItemA.className = "nav-link navitemcolor";
      profilNavItemA.innerHTML = "<b>Profil</b>";
      profilNavItemA.id = "profilNav";
      const afgangNavItemA = document.createElement("a");
      afgangNavItemA.className = "nav-link navitemcolor";
      afgangNavItemA.innerHTML = "<b>Afgang & Ankomst</b>";
      afgangNavItemA.addEventListener('click', GetAfgangPage);
      const alarmNavItemA = document.createElement("a");
      alarmNavItemA.className = "nav-link navitemcolor";
      alarmNavItemA.innerHTML = "<b>Alarmtider</b>";
      alarmNavItemA.addEventListener('click', GetAlarmPage);
      const logNavItemA = document.createElement("a");
      logNavItemA.className = "nav-link navitemcolor";
      logNavItemA.innerHTML = "<b>Rejse Dagbog</b>";
      logNavItemA.addEventListener('click', GetLogPage);

      // LOG UD A-TAG
      // const signOutA = document.getElementById("signOutA");

      // INDSÆTTER ALLE ELEMENTER I INNERHTML
      // HEADER
      profilBody.appendChild(profilHeader);
      profilHeader.appendChild(profilDivHeader);
      profilDivHeader.appendChild(profilHeaderH1);
      profilHeaderH1.appendChild(profilHeaderH1Span);

      // NAVIGATION
      profilBody.appendChild(profilUl);
      profilUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
      profilNavItemLi.appendChild(profilNavItemA);
      afgangNavItemLi.appendChild(afgangNavItemA);
      alarmNavItemLi.appendChild(alarmNavItemA);
      logNavItemLi.appendChild(logNavItemA);
      
  }

function GetAfgangPage(): void {

    // OPRETTER ALLE ELEMENTER
    // BODY
    const afgangBody = document.getElementById("profilbody");

    // HEADER
    const afgangHeader = document.createElement("header");
    afgangHeader.className = "container fluid col-lg-12";
    const afgangDivHeader = document.createElement("div");
    afgangDivHeader.className = "col-lg-6";
    const afgangHeaderH1 = document.createElement("h1");
    afgangHeaderH1.className = "color headerh1";
    const afgangHeaderH1Span = document.createElement("span");

    // NAVIGATION
    const afgangUl = document.createElement("ul");
    afgangUl.className = "nav flex-column col-lg-1";
    afgangUl.id = "navbackground";
    const profilNavItemLi = document.createElement("li");
    profilNavItemLi.className = "nav-item";
    const afgangNavItemLi = document.createElement("li");
    afgangNavItemLi.className = "nav-item";
    const alarmNavItemLi = document.createElement("li");
    alarmNavItemLi.className = "nav-item";
    const logNavItemLi = document.createElement("li");
    logNavItemLi.className = "nav-item";
    const profilNavItemA = document.createElement("a");
    profilNavItemA.className = "nav-link navitemcolor";
    profilNavItemA.href = "profil.htm";
    profilNavItemA.text = "<b>Profil</b>";
    const afgangNavItemA = document.createElement("a");
    afgangNavItemA.className = "nav-link navitemcolor";
    afgangNavItemA.href = "afgang.htm";
    afgangNavItemA.text = "<b>Afgang & Ankomst</b>";
    const alarmNavItemA = document.createElement("a");
    alarmNavItemA.className = "nav-link navitemcolor";
    alarmNavItemA.href = "alarm.htm";
    alarmNavItemA.text = "<b>Alarmtider</b>";
    const logNavItemA = document.createElement("a");
    logNavItemA.className = "nav-link navitemcolor";
    logNavItemA.href = "log.htm";
    logNavItemA.text = "<b>Rejse Dagbog</b>";

    // LOG UD A-TAG
    // const signOutA = document.getElementById("signOutA");

    // INDSÆTTER ALLE ELEMENTER I INNERHTML
    // HEADER
    afgangBody.appendChild(afgangHeader);
    afgangHeader.appendChild(afgangDivHeader);
    afgangDivHeader.appendChild(afgangHeaderH1);
    afgangHeaderH1.appendChild(afgangHeaderH1Span);

    // NAVIGATION
    afgangBody.appendChild(afgangUl);
    afgangUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);

}

function GetAlarmPage(): void {

    // OPRETTER ALLE ELEMENTER
    // BODY
    const alarmBody = document.getElementById("profilbody");

    // HEADER
    const alarmHeader = document.createElement("header");
    alarmHeader.className = "container fluid col-lg-12";
    const alarmDivHeader = document.createElement("div");
    alarmDivHeader.className = "col-lg-6";
    const alarmHeaderH1 = document.createElement("h1");
    alarmHeaderH1.className = "color headerh1";
    const alarmHeaderH1Span = document.createElement("span");

    // NAVIGATION
    const alarmUl = document.createElement("ul");
    alarmUl.className = "nav flex-column col-lg-1";
    alarmUl.id = "navbackground";
    const profilNavItemLi = document.createElement("li");
    profilNavItemLi.className = "nav-item";
    const afgangNavItemLi = document.createElement("li");
    afgangNavItemLi.className = "nav-item";
    const alarmNavItemLi = document.createElement("li");
    alarmNavItemLi.className = "nav-item";
    const logNavItemLi = document.createElement("li");
    logNavItemLi.className = "nav-item";
    const profilNavItemA = document.createElement("a");
    profilNavItemA.className = "nav-link navitemcolor";
    profilNavItemA.href = "profil.htm";
    profilNavItemA.text = "<b>Profil</b>";
    const afgangNavItemA = document.createElement("a");
    afgangNavItemA.className = "nav-link navitemcolor";
    afgangNavItemA.href = "afgang.htm";
    afgangNavItemA.text = "<b>Afgang & Ankomst</b>";
    const alarmNavItemA = document.createElement("a");
    alarmNavItemA.className = "nav-link navitemcolor";
    alarmNavItemA.href = "alarm.htm";
    alarmNavItemA.text = "<b>Alarmtider</b>";
    const logNavItemA = document.createElement("a");
    logNavItemA.className = "nav-link navitemcolor";
    logNavItemA.href = "log.htm";
    logNavItemA.text = "<b>Rejse Dagbog</b>";

    // LOG UD A-TAG
   // const signOutA = document.getElementById("signOutA");

    // INDSÆTTER ALLE ELEMENTER I INNERHTML
    // HEADER
    alarmBody.appendChild(alarmHeader);
    alarmHeader.appendChild(alarmDivHeader);
    alarmDivHeader.appendChild(alarmHeaderH1);
    alarmHeaderH1.appendChild(alarmHeaderH1Span);

    // NAVIGATION
    alarmBody.appendChild(alarmUl);
    alarmUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);
}

function GetLogPage(): void {

    // OPRETTER ALLE ELEMENTER
    // BODY
    const logBody = document.getElementById("profilbody");

    // HEADER
    const logHeader = document.createElement("header");
    logHeader.className = "container fluid col-lg-12";
    const logDivHeader = document.createElement("div");
    logDivHeader.className = "col-lg-6";
    const logHeaderH1 = document.createElement("h1");
    logHeaderH1.className = "color headerh1";
    const logHeaderH1Span = document.createElement("span");

    // NAVIGATION
    const logUl = document.createElement("ul");
    logUl.className = "nav flex-column col-lg-1";
    logUl.id = "navbackground";
    const profilNavItemLi = document.createElement("li");
    profilNavItemLi.className = "nav-item";
    const afgangNavItemLi = document.createElement("li");
    afgangNavItemLi.className = "nav-item";
    const alarmNavItemLi = document.createElement("li");
    alarmNavItemLi.className = "nav-item";
    const logNavItemLi = document.createElement("li");
    logNavItemLi.className = "nav-item";
    const profilNavItemA = document.createElement("a");
    profilNavItemA.className = "nav-link navitemcolor";
    profilNavItemA.href = "profil.htm";
    profilNavItemA.text = "<b>Profil</b>";
    const afgangNavItemA = document.createElement("a");
    afgangNavItemA.className = "nav-link navitemcolor";
    afgangNavItemA.href = "afgang.htm";
    afgangNavItemA.text = "<b>Afgang & Ankomst</b>";
    const alarmNavItemA = document.createElement("a");
    alarmNavItemA.className = "nav-link navitemcolor";
    alarmNavItemA.href = "alarm.htm";
    alarmNavItemA.text = "<b>Alarmtider</b>";
    const logNavItemA = document.createElement("a");
    logNavItemA.className = "nav-link navitemcolor";
    logNavItemA.href = "log.htm";
    logNavItemA.text = "<b>Rejse Dagbog</b>";

    // LOG UD A-TAG
    // const signOutA = document.getElementById("signOutA");

    // INDSÆTTER ALLE ELEMENTER I INNERHTML
    // HEADER
    logBody.appendChild(logHeader);
    logHeader.appendChild(logDivHeader);
    logDivHeader.appendChild(logHeaderH1);
    logHeaderH1.appendChild(logHeaderH1Span);

    // NAVIGATION
    logBody.appendChild(logUl);
    logUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);

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

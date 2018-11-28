import axios, {AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import { Leg } from "../js/leg";
import { Trip } from "../js/trip";

const ulist: HTMLUListElement = document.getElementById("ulist") as HTMLUListElement;
const node = document.createElement("li") as HTMLLIElement;
const span = document.createElement("span") as HTMLSpanElement;
const GetAButton: HTMLButtonElement = document.getElementById("GetAButton") as HTMLButtonElement;

GetAButton.addEventListener("click", GetAllTrips);
const uri: string = "https://localhost:44364/api/trip";

function GetAllTrips(): void {
    ulist.innerHTML = "";

    axios.get<Trip[]>(uri)
    .then( (response: AxiosResponse <Trip[]>): void => {
        response.data.forEach((trip: Trip) => {

            if (trip == null) {} else {

                trip.Legs.forEach((leg: Leg) => {
                    span.appendChild(document.createTextNode(`${leg.Name} ${leg.Type}`));
                });
                node.appendChild(span);
                node.appendChild(document.createTextNode(`${trip.Origin.Name} ${trip.Destination.Name}`));
                ulist.appendChild(node);
            }
        });
    }).catch((error: AxiosError): void => {
        ulist.innerHTML = error.message;
        console.log(error.message);
    });
}


function onSignIn(googleUser:any) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    window.location.href = "http://localhost:3000/profil.htm";
  }

if(onSignIn)
{
    GetProfilePage();
}

function GetLoginPage():void {
    const loginBody = document.getElementById("profilbody");
    const loginHeader = document.createElement("header");
    loginHeader.className = "container fluid col-lg-12";
    const loginHeaderDiv = document.createElement("div");
    loginHeaderDiv.className = "col-lg-6";
    const loginHeaderH1 = document.createElement("h1");
    loginHeaderH1.className = "color";
    const loginHeaderH1Span = document.createElement("span");
    loginHeaderH1Span.className = "forsent";
    const loginFormContainer = document.createElement("form");
    loginFormContainer.className = "col-lg-4 offset-lg-5 formcontainer";
    const loginFormDiv = document.createElement("div");
    loginFormDiv.className = "g-signin2";
    loginFormDiv.
}

  function GetProfilePage():void {
      
      //OPRETTER ALLE ELEMENTER
      //BODY
      const profilBody = document.getElementById("profilbody");

      //HEADER
      const profilHeader = document.createElement("header");
      profilHeader.className = "container fluid col-lg-12";
      const profilDivHeader = document.createElement("div");
      profilDivHeader.className = "col-lg-6";
      const profilHeaderH1 = document.createElement("h1");
      profilHeaderH1.className = "color";
      const profilHeaderH1Span = document.createElement("span");

      //NAVIGATION
      const profilUl = document.createElement("ul")
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

      //LOG UD A-TAG
      const signOutA = document.getElementById("signOutA");
      signOutA.style.display = "block";
      
      //INDSÆTTER ALLE ELEMENTER I INNERHTML 
      //HEADER
      profilBody.appendChild(profilHeader);
      profilHeader.appendChild(profilDivHeader);
      profilDivHeader.appendChild(profilHeaderH1);
      profilHeaderH1.appendChild(profilHeaderH1Span);

      //NAVIGATION
      profilBody.appendChild(profilUl);
      profilUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
      profilNavItemLi.appendChild(profilNavItemA);
      afgangNavItemLi.appendChild(afgangNavItemA);
      alarmNavItemLi.appendChild(alarmNavItemA);
      logNavItemLi.appendChild(logNavItemA);

      //LOG UD A-TAG
      profilBody.appendChild(signOutA);
    
  }

  function GetAfgangPage():void {
    
    //OPRETTER ALLE ELEMENTER
    //BODY
    const afgangBody = document.getElementById("profilbody");

    //HEADER
    const afgangHeader = document.createElement("header");
    afgangHeader.className = "container fluid col-lg-12";
    const afgangDivHeader = document.createElement("div");
    afgangDivHeader.className = "col-lg-6";
    const afgangHeaderH1 = document.createElement("h1");
    afgangHeaderH1.className = "color";
    const afgangHeaderH1Span = document.createElement("span");

    //NAVIGATION
    const afgangUl = document.createElement("ul")
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

    //LOG UD A-TAG
    const signOutA = document.getElementById("signOutA");
    signOutA.hidden = false;
    
    //INDSÆTTER ALLE ELEMENTER I INNERHTML 
    //HEADER
    afgangBody.appendChild(afgangHeader);
    afgangHeader.appendChild(afgangDivHeader);
    afgangDivHeader.appendChild(afgangHeaderH1);
    afgangHeaderH1.appendChild(afgangHeaderH1Span);

    //NAVIGATION
    afgangBody.appendChild(afgangUl);
    afgangUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);

    //LOG UD A-TAG
    afgangBody.appendChild(signOutA);
}

function GetAlarmPage():void {
    
    //OPRETTER ALLE ELEMENTER
    //BODY
    const alarmBody = document.getElementById("profilbody");

    //HEADER
    const alarmHeader = document.createElement("header");
    alarmHeader.className = "container fluid col-lg-12";
    const alarmDivHeader = document.createElement("div");
    alarmDivHeader.className = "col-lg-6";
    const alarmHeaderH1 = document.createElement("h1");
    alarmHeaderH1.className = "color";
    const alarmHeaderH1Span = document.createElement("span");

    //NAVIGATION
    const alarmUl = document.createElement("ul")
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

    //LOG UD A-TAG
    const signOutA = document.getElementById("signOutA");
    signOutA.hidden = false;
    
    //INDSÆTTER ALLE ELEMENTER I INNERHTML 
    //HEADER
    alarmBody.appendChild(alarmHeader);
    alarmHeader.appendChild(alarmDivHeader);
    alarmDivHeader.appendChild(alarmHeaderH1);
    alarmHeaderH1.appendChild(alarmHeaderH1Span);

    //NAVIGATION
    alarmBody.appendChild(alarmUl);
    alarmUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);

    //LOG UD A-TAG
    alarmBody.appendChild(signOutA);
}

function GetLogPage():void {
    
    //OPRETTER ALLE ELEMENTER
    //BODY
    const logBody = document.getElementById("profilbody");

    //HEADER
    const logHeader = document.createElement("header");
    logHeader.className = "container fluid col-lg-12";
    const logDivHeader = document.createElement("div");
    logDivHeader.className = "col-lg-6";
    const logHeaderH1 = document.createElement("h1");
    logHeaderH1.className = "color";
    const logHeaderH1Span = document.createElement("span");

    //NAVIGATION
    const logUl = document.createElement("ul")
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

    //LOG UD A-TAG
    const signOutA = document.getElementById("signOutA");
    signOutA.hidden = false;
    
    //INDSÆTTER ALLE ELEMENTER I INNERHTML 
    //HEADER
    logBody.appendChild(logHeader);
    logHeader.appendChild(logDivHeader);
    logDivHeader.appendChild(logHeaderH1);
    logHeaderH1.appendChild(logHeaderH1Span);

    //NAVIGATION
    logBody.appendChild(logUl);
    logUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);

    //LOG UD A-TAG
    logBody.appendChild(signOutA);
}
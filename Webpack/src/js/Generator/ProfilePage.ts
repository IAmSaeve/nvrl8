import { GetAlarmPage } from "./AlarmPage";
import { GetAfgangPage } from "./DeparturesPage";
import { GetLogPage } from "./LogPage";

const profilNav: HTMLButtonElement = document.getElementById("profilNav") as HTMLButtonElement;
profilNav.addEventListener("click", GetProfilePage);

export function GetProfilePage(): void {

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
    afgangNavItemA.addEventListener("click", GetAfgangPage);
    const alarmNavItemA = document.createElement("a");
    alarmNavItemA.className = "nav-link navitemcolor";
    alarmNavItemA.innerHTML = "<b>Alarmtider</b>";
    alarmNavItemA.addEventListener("click", GetAlarmPage);
    const logNavItemA = document.createElement("a");
    logNavItemA.className = "nav-link navitemcolor";
    logNavItemA.innerHTML = "<b>Rejse Dagbog</b>";
    logNavItemA.addEventListener("click", GetLogPage);

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

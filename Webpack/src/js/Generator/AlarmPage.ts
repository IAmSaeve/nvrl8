export function GetAlarmPage(): void {

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

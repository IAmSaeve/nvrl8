export function GetLogPage(): void {

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

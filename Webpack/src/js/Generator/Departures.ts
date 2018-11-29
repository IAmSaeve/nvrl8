export function GetAfgangPage(): void {

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

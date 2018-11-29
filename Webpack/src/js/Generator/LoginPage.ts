const content: HTMLDivElement = document.getElementById("content") as HTMLDivElement;

export function GetLoginPage(): void {
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

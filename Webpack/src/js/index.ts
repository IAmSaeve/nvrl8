import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import * as data from "../Data/stops.json";
import { autocomplete } from "./autocomplete";
import { ICoordLocation } from "./Interface/ICoordLocation";
import { ILocationList } from "./Interface/ILocationList";
import { IStop } from "./Interface/IStop";
import { ITripList } from "./Interface/ITripList";
import { Leg } from "./Model/Leg";
import { Trip } from "./Model/Trip";

/*let nameStr = document.getElementById("nameDiv");
let imageStr = document.getElementById("imageDiv");
let emailStr = document.getElementById("emailDiv");
let nameP = document.getElementById("name");
let imageP = document.getElementById("image");
let emailP = document.getElementById("email");

nameStr.innerText = nameP.textContent;
imageStr.textContent = imageP.textContent;
emailStr.textContent = emailP.textContent;*/ // bugs out on afgang.htm

const stopArray: IStop[] = data.default as IStop[];

const stringArray: string[] = new Array();
stopArray.forEach((e) => {
    stringArray.push(e.stop_name + "," + e.stop_id);
});

const date: Date = new Date();
const today: string = date.getDate() + "." +
    (date.getMonth() + 1) + "." +
    (date.getFullYear().toString().split("20")[1]);
let time: string = date.getHours() + ":" + date.getMinutes();
if (date.getMinutes() < 10) {
    time = date.getHours() + ":" + "0" + date.getMinutes();
}
if (date.getHours() < 10) {
    time = "0" + time;
}

const originInput = document.getElementById("OriginInput") as HTMLInputElement;
const destInput = document.getElementById("DestinationInput") as HTMLInputElement;

const departureTime = document.getElementById("beforeDepartureTime") as HTMLInputElement;
departureTime.value = "01:00";

let destArray: string[] = new Array();
let origArray: string[] = new Array();

let address: string;
let originX: string;
let originY: string;
let destId: string;

console.log(time);
(document.getElementById("ankomstTime") as HTMLInputElement).value = time; // Sætter et starttidspunkt på inputfielded

let uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
    "trip?originCoordX=" + originX + "&originCoordY=" + originY + "&originCoordName=" + address +
    "&destId=" + destId + "&date=" + today + "&time=" + time + "&searchForArrival=1&useBus=1&format=json";
(document.getElementById("TripButton") as HTMLButtonElement).addEventListener("click", GetTripsAxios);

originInput.addEventListener("change", () => {
    address = (document.getElementById("OriginInput") as HTMLInputElement).value;
    if (address.length > 5) {
        GetLatLongAxios();
    }
});

function GetLatLongAxios(): void {
    const addressUri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/location?input="
        + address + "&format=json";
    origArray = new Array();
    document.getElementById("OriginStations").innerHTML = "Indlæser...";
    axios.get<ILocationList[]>(addressUri, {
        headers: {
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
        },
    })
        .then((response: AxiosResponse<any>) => {
            document.getElementById("OriginStations").innerHTML = "";
            let listCount = 0;
            const mList: any = response.data;
            const mapData: ILocationList = mList.LocationList as ILocationList;
            console.log(mapData);
            if (Array.isArray(mapData.CoordLocation)) {
                mapData.CoordLocation.forEach((e: ICoordLocation) => {
                    if (listCount < 3) {
                        const item: ICoordLocation = e as ICoordLocation;
                        const node = document.createElement("li");
                        const txt = document.createTextNode(item.name);
                        node.appendChild(txt);
                        document.getElementById("OriginStations").appendChild(node);
                        listCount++;
                    }
                });
                originX = mapData.CoordLocation[0].x;
                originY = mapData.CoordLocation[0].y;
            } else {
                const item: ICoordLocation = mapData.CoordLocation as ICoordLocation;
                const node = document.createElement("li");
                const txt = document.createTextNode(item.name);
                node.appendChild(txt);
                document.getElementById("OriginStations").appendChild(node);
                originX = mapData.CoordLocation.x;
                originY = mapData.CoordLocation.y;
            }
            console.log(originX + " " + originY);
        });
}

destInput.addEventListener("keyup", () => {
    destArray = new Array();
    document.getElementById("DestinationStations").innerHTML = "";
    if (destInput.value.length > 3) {
        stringArray.filter((item: string) => {
            if (item.toLowerCase().match(destInput.value.toLowerCase()) && destArray.length < 3) {
                destArray.push(item);
            }
        });
        destArray.forEach((e) => {
            const node = document.createElement("li");
            const txt = document.createTextNode(e);
            node.appendChild(txt);
            document.getElementById("DestinationStations").appendChild(node);
        });
        if (destArray !== undefined) {
            destId = destArray[0].split(",")[1];
        }
    }
});

let tripCount = 0;

let tripArray: Trip[] = new Array();
let selectedTrip: Trip;

function GetTripsAxios(): void {
    time = (document.getElementById("ankomstTime") as HTMLInputElement).value;
    const useBus = (document.getElementById("useBus") as HTMLSelectElement).value;
    uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
        "trip?originCoordX=" + originX + "&originCoordY=" + originY + "&originCoordName=" + address +
        "&destId=" + destId + "&date=" + today + "&time=" + time + "&searchForArrival=1&useBus=" +
        useBus + "&format=json";
    // console.log(uri);
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
            tripArray = tlist.TripList.Trip as Trip[];
            tripCount = 0;
            tripArray.forEach((element: Trip) => {
                const node = document.createElement("li");
                const legArray: Leg[] = element.Leg as Leg[];
                console.log(tripCount);
                if (Array.isArray(element.Leg)) {
                    element.Leg.forEach((e) => {
                        const legNode = document.createElement("li");
                        if (e === element.Leg[0]) { // Viser linjeskift ved ny rejse
                            const newLine = document.createElement("li");
                            newLine.appendChild(document.createTextNode("---------------------"));
                            const selectTrip = document.createElement("input");
                            selectTrip.type = "checkbox";
                            selectTrip.id = "trip";
                            selectTrip.id += tripCount; // trip1, trip2 etc
                            console.log(selectTrip.id);
                            node.appendChild(newLine);
                            node.appendChild(selectTrip);
                            node.appendChild(document.createTextNode(" Vælg rejse"));
                        }
                        legNode.appendChild(document.createTextNode(`Name : ${e.name}, Type : ${e.type},
                                      Origin : ${e.Origin.name}, Kl : ${e.Origin.time},
                                       Destination : ${e.Destination.name},
                                      Kl : ${e.Destination.time}`));
                        node.appendChild(legNode);
                    });
                } else {
                    const legNode = document.createElement("li");
                    const newLine = document.createElement("li");
                    newLine.appendChild(document.createTextNode("---------------------"));
                    node.appendChild(newLine);
                    const newLeg: Leg = element.Leg as Leg;
                    legNode.appendChild(document.createTextNode(`Name : ${newLeg.name}, Type : ${newLeg.type},
                                  Origin : ${newLeg.Origin.name}, Kl : ${newLeg.Origin.time},
                                   Destination : ${newLeg.Destination.name},
                                  Kl : ${newLeg.Destination.time}`));
                    node.appendChild(legNode);
                }
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
                tripCount++;
            });
            // Logik der sørger for man kun kan vælge 1 rejse
            // Gemmer rejsen i selectedTrip.
            let amountChecked = 0;
            for (let i = 0; i < tripCount; i++) {
                const id = "trip" + i;
                const checkbox = (document.getElementById(id) as HTMLInputElement);
                checkbox.addEventListener("change", () => {
                    if (checkbox.checked) {
                        amountChecked++;
                        if (amountChecked === 1) {
                            console.log(id);
                            selectedTrip = tripArray[i];
                            console.log(selectedTrip);
                            const beforeGoTime = document.getElementById("beforeDepartureTime") as HTMLInputElement;

                            const beforeGoHr = beforeGoTime.value.split(":")[0];
                            const beforeGoMin = beforeGoTime.value.split(":")[1];
                            const goTimeHr = selectedTrip.Leg[0].Origin.time.split(":")[0];
                            const goTimeMin = selectedTrip.Leg[0].Origin.time.split(":")[1];
                            let alarmHour = +goTimeHr;
                            let alarmMinute = +goTimeMin;
                            let alarmString: string = "";
                            // Logik til at regne alarmtid ud...
                            for (let hour = 0; hour < +beforeGoHr; hour++) {
                                if (+alarmHour === 0) {
                                    alarmHour = 24;
                                }
                                alarmHour--;
                            }
                            for (let minute = 0; minute < +beforeGoMin; minute++) {
                                if (+alarmMinute === 0) {
                                    if (alarmHour === 0) {
                                        alarmHour = 23;
                                    } else {
                                        alarmHour -= 1;
                                    }
                                    alarmMinute = 60;
                                }
                                alarmMinute--;
                            }
                            if (alarmHour < 10) {
                                alarmString += "0";
                            }
                            alarmString += alarmHour + ":";
                            if (alarmMinute < 10) {
                                alarmString += "0";
                            }
                            alarmString += alarmMinute;
                            const displayAlarmStr = "Alarmen ringer kl : " + alarmString;
                            document.getElementById("alarmTime").innerHTML = displayAlarmStr;
                        }
                    } else {
                        amountChecked--;
                    }
                    if (amountChecked > 1) {
                        checkbox.checked = false;
                        amountChecked--;
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


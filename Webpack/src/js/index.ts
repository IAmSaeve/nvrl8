
import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import * as data from "../Data/stops.json";
import { autocomplete } from "./autocomplete";
import { IStop } from "./Interface/IStop";
import { ITripList } from "./Interface/ITripList";
import { Leg } from "./Model/Leg";
import { Trip } from "./Model/Trip";

const stopArray: IStop[] = data.default as IStop[];

const stringArray: string[] = new Array();
stopArray.forEach((e) => {
    stringArray.push(e.stop_name + "," + e.stop_id);
});

const date: Date = new Date();
const today: string = date.getDate() + "." +
    (date.getMonth() + 1) + "." +
    (date.getFullYear().toString().split("20")[1]);
const time: string = date.getHours() + ":" + date.getMinutes();

const originInput = document.getElementById("OriginInput") as HTMLInputElement;
const destInput = document.getElementById("DestinationInput") as HTMLInputElement;

let originsArray: string[] = new Array();
let destArray: string[] = new Array();

let originId: string;
let destId: string;

let uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
    "trip?originId=" + originId + "&destId=" + destId + "&date=" + today + "&time=" + time + "&useBus=1&format=json";

(document.getElementById("TripButton") as HTMLButtonElement).addEventListener("click", GetTripsAxios);

originInput.addEventListener("keyup", () => {
    originsArray = new Array();
    document.getElementById("OriginStations").innerHTML = "";
    if (originInput.value.length > 3) {
        stringArray.filter((item: string) => {
            if (item.toLowerCase().match(originInput.value.toLowerCase()) && originsArray.length < 3) {
                originsArray.push(item);
            }
        });
        originsArray.forEach((e) => {
            const node = document.createElement("li");
            const txt = document.createTextNode(e);
            node.appendChild(txt);
            document.getElementById("OriginStations").appendChild(node);
        });
        if (originsArray !== undefined) {
            originId = originsArray[0].split(",")[1];
        }
    }
});

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

function GetTripsAxios(): void {
    uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
        "trip?originId=" + originId + "&destId=" +
         destId + "&date=" + today + "&time=" + time + "&useBus=1&format=json";
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
            array.forEach((element: Trip) => {
                const node = document.createElement("li");
                const legArray: Leg[] = element.Leg as Leg[];
                if (Array.isArray(element.Leg)) {
                    element.Leg.forEach((e) => {
                        const legNode = document.createElement("li");
                        if (e === element.Leg[0]) { // Viser linjeskift ved ny rejse
                            const newLine = document.createElement("li");
                            newLine.appendChild(document.createTextNode("---------------------"));
                            node.appendChild(newLine);
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
                    legNode.appendChild(document.createTextNode(`Name : ${element.Leg.name}, Type : ${element.Leg.type},
                                  Origin : ${element.Leg.Origin.name}, Kl : ${element.Leg.Origin.time},
                                   Destination : ${element.Leg.Destination.name},
                                  Kl : ${element.Leg.Destination.time}`));
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
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

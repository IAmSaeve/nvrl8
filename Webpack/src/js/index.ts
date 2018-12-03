
import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import * as data from "../Data/stops.json";
import { IStop } from "./Interface/IStop";
import { ITripList } from "./Interface/ITripList";
import { Leg } from "./Model/Leg";
import { Trip } from "./Model/Trip";

const stopArray: IStop[] = data.default as IStop[];

const stringArray: string[] = new Array();
stopArray.forEach((e) => {
    stringArray.push(e.stop_name + ", " + e.stop_id);
});
console.log(stringArray.length);

const date: Date = new Date();
const today: string = date.getDate() + "." +
    (date.getMonth() + 1) + "." +
    (date.getFullYear().toString().split("20")[1]);
const time: string = date.getHours() + ":" + date.getMinutes();

const uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
    "trip?originId=8600617&destId=8600696&date=29.11.18&time=12:30&useBus=0&format=json";

(document.getElementById("TripButton") as HTMLButtonElement).addEventListener("click", GetTripsAxios);

const originInput = document.getElementById("OriginInput") as HTMLInputElement;

let originsArray: string[] = new Array();
originInput.addEventListener("keyup", () => {
    originsArray = new Array();
    document.getElementById("OriginStations").innerHTML = "";
    stringArray.filter((item: string) => {
        if (item.toLowerCase().match(originInput.value.toLowerCase())) {
            originsArray.push(item);
        }
    });
    originsArray.forEach((e) => {
        const node = document.createElement("li");
        const txt = document.createTextNode(e);
        node.appendChild(txt);
        document.getElementById("OriginStations").appendChild(node);
    });
});

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
                    console.log("creating li element from " + element.Leg);
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
            console.log(error);
        });
}

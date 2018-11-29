import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import { autocomplete } from "./autocomplete";
import { IStop } from "./Interface/IStop";
import { Leg } from "./Model/leg";
import { Trip } from "./Model/trip";

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

const date: Date = new Date();
const today: string = date.getDate() + "." +
    (date.getMonth() + 1) + "." +
    (date.getFullYear().toString().split("20")[1]);
const time: string = date.getHours() + ":" + date.getMinutes();

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
            console.log(error);
        });
}

const afgangNav: HTMLButtonElement = document.getElementById("afgangNav") as HTMLButtonElement;
const alarmNav: HTMLButtonElement = document.getElementById("alarmNav") as HTMLButtonElement;
const logNav: HTMLButtonElement = document.getElementById("logNav") as HTMLButtonElement;
const signOutA: HTMLAnchorElement = document.getElementById("signOutA") as HTMLAnchorElement;
const logInDiv: HTMLDivElement = document.getElementById("logInDiv") as HTMLDivElement;

// if (!onSignIn) {
//   GetLoginPage();
// } else if (onSignIn) {
//   GetProfilePage();
// }

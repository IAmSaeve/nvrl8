
import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import { Leg } from "../js/leg";
import { Trip } from "../js/trip";

// Import stop locations.
import * as data from "../Data/stops.json";
const stopArray: IStop[] = data.default as IStop[];
console.log(stopArray);

interface ITripList {
    TripList: Trip[];
}

interface IITripList {
    TripList: ITripList;
}

const date: Date = new Date();
const today: string = date.getDate() + "." +
    (date.getMonth() + 1) + "." +
    (date.getFullYear().toString().split("20")[1]);
console.log(today);

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
            // handle error
            console.log(error);
        })
        .then(() => {
            // always executed
        });
}

interface IStop {
    stop_id: string;
    stop_code: string;
    stop_name: string;
    stop_desc: string;
    stop_lat: string;
    stop_lon: string;
    location_type: string;
    parent_station: string;
}

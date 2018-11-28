import axios, {AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import { Leg } from "../js/leg";
import { Trip } from "../js/trip";


const ulist: HTMLUListElement = document.getElementById("ulist") as HTMLUListElement;
const node = document.createElement("li") as HTMLLIElement;
const span = document.createElement("span") as HTMLSpanElement;
const GetAButton: HTMLButtonElement = document.getElementById("GetAButton") as HTMLButtonElement;

GetAButton.addEventListener("click", GetAllTrips);
const uri: string = "https://localhost:44364/api/trip";

function GetAllTrips(): void {
    ulist.innerHTML = "";

    axios.get<Trip[]>(uri)
    .then( (response: AxiosResponse <Trip[]>): void => {

        response.data.forEach((trip: Trip) => {

            if (trip == null) {} else {

                trip.Legs.forEach((leg: Leg) => {
                    span.appendChild(document.createTextNode(`${leg.Name} ${leg.Type}`));
                });
                node.appendChild(span);
                node.appendChild(document.createTextNode(`${trip.Origin.Name} ${trip.Destination.Name}`));
                ulist.appendChild(node);
            }
        });
    }).catch((error: AxiosError): void => {
        ulist.innerHTML = error.message;
        console.log(error.message);
    });
}

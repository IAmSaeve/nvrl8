import { Leg } from "../js/leg";
import { Trip } from "../js/trip";
import axios, {AxiosError, AxiosResponse } from "/Source/nvrl8/Webpack/node_modules/axios/index";

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
                span.append(node);
                node.appendChild(document.createTextNode(`${trip.Origin.Name} ${trip.Destination.Name}`));
                node.append(ulist);
            }
        });
    });
}

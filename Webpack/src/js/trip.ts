import { Destination } from "../js/destination";
import { Leg } from "../js/leg";
import { Origin } from "../js/origin";

export class Trip {

public Legs: Leg[];
public Origin: Origin;
public Destination: Destination;

constructor(legs: Leg[], origin: Origin, desitination: Destination) {
    this.Legs = legs;
    this.Origin = origin;
    this.Destination = desitination;
}

}

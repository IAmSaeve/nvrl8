import { Destination } from "../js/destination";
import { Origin } from "../js/origin";
export class Leg {
    public Name: string;
    public Type: string;
    public Origin: Origin;
    public Destination: Destination;

    constructor(name: string, type: string, origin: Origin, destination: Destination) {
        this.Name = name;
        this.Type = type;
        this.Origin = origin;
        this.Destination = destination;
    }
}

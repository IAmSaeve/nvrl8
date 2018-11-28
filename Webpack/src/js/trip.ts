import { Leg } from "../js/leg";

export class Trip {
    public Alternative: boolean;
    public Cancelled: boolean;
    public Valid: boolean;
    public Legs: Leg[];

 constructor(legs: Leg[], alternative?: boolean, valid?: boolean, cancelled?: boolean) {
    this.Legs = legs;

    this.Alternative = alternative;
    this.Valid = valid;
    this.Cancelled = cancelled;
}

}

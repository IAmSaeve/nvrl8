import { Leg } from "../js/leg";

export class Trip {
    public alternative: boolean;
    public cancelled: boolean;
    public valid: boolean;
    public Leg: Leg[];

 constructor(legs: Leg[], alternative?: boolean, valid?: boolean, cancelled?: boolean) {
    this.Leg = legs;

    this.alternative = alternative && alternative || false;
    this.valid = valid && valid || true;
    this.cancelled = cancelled && cancelled || false;
}

}

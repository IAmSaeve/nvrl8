import { Destination } from "./Destination";
import { Origin } from "./Origin";

/**
 *
 *
 * @export
 * @class Leg
 */
export class Leg {
  public name: string;
  public type: string;
  public Origin: Origin;
  public Destination: Destination;

  constructor(
    name: string,
    type: string,
    origin: Origin,
    destination: Destination,
  ) {
    this.name = name;
    this.type = type;
    this.Origin = origin;
    this.Destination = destination;
  }
}

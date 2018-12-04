/**
 *
 *
 * @export
 * @class Destination
 */
export class Destination {
    public name: string;
    public type: string;
    public routeIdx: number;
    public time: string;
    public rtTime: string;
    public date: string;
    public rtDate: string;
    public track: string;
    public rtTrack: string;

    constructor(name: string, type: string, time: string, date: string,
                routeIdx?: number, track?: string, rtTime?: string, rtDate?: string, rtTrack?: string) {
        this.name = name;
        this.type = type;
        this.time = time;
        this.date = date;

        this.routeIdx = routeIdx;
        this.track = track;
        this.rtTime = rtTime;
        this.rtDate = rtDate;
        this.rtTrack = rtTrack;
    }
}

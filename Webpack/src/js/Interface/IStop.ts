/**
 *
 *
 * @export
 * @interface IStop
 */
export interface IStop {
    stop_id: string;
    stop_code: string;
    stop_name: string;
    stop_desc: string;
    stop_lat: string;
    stop_lon: string;
    location_type: string;
    parent_station: string;
}

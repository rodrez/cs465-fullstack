import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Trip } from "models/trips";

@Injectable({
  providedIn: "root",
})
export class TripDataService {
  constructor(private http: Http) {}

  private apiBaseUrl = "http://localhost:3000/api";

  public getTrips(): Promise<Trip[]> {
    const url: string = `${this.apiBaseUrl}/trips`;
    console.log("Calling TripDataService.getTrips");

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error);
    return Promise.reject(error.message || error);
  }
}

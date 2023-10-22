import { Injectable, Inject } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Trip } from "./models/trips";
import { User } from "./models/user";
import { AuthResponse } from "./authresponse";
import { BROWSER_STORAGE } from "./storage";

@Injectable({
  providedIn: "root",
})
export class TripDataService {
  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) storage: Storage,
  ) {}

  private apiBaseUrl = "http://localhost:3000/api";
  private tripUrl = `${this.apiBaseUrl}/trips`;

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response.json() as AuthResponse)
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log("Calling TripDataService.addTrip");

    console.log("token", localStorage.getItem("token"));
    const headers: Headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return this.http
      .post(this.tripUrl, formData, { headers })
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log("Calling TripDataService.getTrips");

    return this.http
      .get(this.tripUrl)
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrip(code: string): Promise<Trip> {
    console.log("Calling TripDataService.getTrip");
    return this.http
      .get(`${this.tripUrl}/${code}`)
      .toPromise()
      .then((response) => response.json() as Trip)
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log("Calling TripDataService.updateTrip");
    console.log("formData", formData);

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });

    return this.http
      .put(`${this.tripUrl}/${formData.code}`, formData, { headers })
      .toPromise()
      .then((response) => response.json() as Trip)
      .catch(this.handleError);
  }

  public deleteTrip(code: string): Promise<Trip> {
    console.log("Calling TripDataService.deleteTrip");
    console.log("code", code);

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });

    return this.http
      .delete(`${this.tripUrl}/${code}`, { headers })
      .toPromise()
      .then((response) => response.json() as Trip)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error);
    return Promise.reject(error.message || error);
  }
}

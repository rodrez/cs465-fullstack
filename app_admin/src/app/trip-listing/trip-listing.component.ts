import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Trip } from "../models/trips";
import { TripDataService } from "../trip-data.service";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-trip-listing",
  templateUrl: "./trip-listing.component.html",
  styleUrls: ["./trip-listing.component.css"],
  providers: [TripDataService],
})
export class TripListingComponent implements OnInit {
  trips: Trip[];
  message: string;

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private addTrip(): void {
    this.router.navigate(["/add-trip"]);
  }

  private getTrips(): void {
    console.log("Calling TripListingComponent.getTrips");
    this.message = "Searching for trips...";
    this.tripDataService.getTrips().then((foundTrips) => {
      console.log("foundTrips", foundTrips);
      this.trips = foundTrips;
      this.message = foundTrips.length > 0 ? "" : "No trips found";
    });
  }

  ngOnInit(): void {
    this.getTrips();
  }
}

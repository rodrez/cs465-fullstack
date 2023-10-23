import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Trip } from "../models/trips";
import { AuthenticationService } from "../authentication.service";
import { TripDataService } from "../trip-data.service";

@Component({
  selector: "app-trip-card",
  templateUrl: "./trip-card.component.html",
  styleUrls: ["./trip-card.component.css"],
})
export class TripCardComponent implements OnInit {
  @Input() trip: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService,
  ) {}

  ngOnInit() {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private editTrip(trip: Trip) {
    localStorage.removeItem("code");
    localStorage.setItem("code", trip.code);
    this.router.navigate(["edit-trip"]);
  }

  private deleteTrip(trip: Trip) {
    localStorage.removeItem("code");
    localStorage.setItem("code", trip.code);
    this.tripDataService.deleteTrip(trip.code);
    this.router.navigate(["list-trips"]);
  }
}

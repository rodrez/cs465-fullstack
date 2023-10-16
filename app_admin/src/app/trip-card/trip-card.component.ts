import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Trip } from "models/trips";

@Component({
  selector: "app-trip-card",
  templateUrl: "./trip-card.component.html",
  styleUrls: ["./trip-card.component.css"],
})
export class TripCardComponent implements OnInit {
  @Input() trip: Trip;

  constructor(private router: Router) {}

  ngOnInit() {}

  private editTrip(trip: Trip) {
    localStorage.removeItem("code");
    localStorage.setItem("code", trip.code);
    this.router.navigate(["edit-trip"]);
  }
}

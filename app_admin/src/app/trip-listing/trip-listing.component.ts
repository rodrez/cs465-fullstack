import { Component, OnInit } from "@angular/core";
import { trips } from "../data/trips";

export type Trip = {
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: string;
  image: string;
  description: string;
};

@Component({
  selector: "app-trip-listing",
  templateUrl: "./trip-listing.component.html",
  styleUrls: ["./trip-listing.component.css"],
})
export class TripListingComponent implements OnInit {
  trips: Array<Trip> = trips;

  constructor() {}
  ngOnInit(): void {}
}

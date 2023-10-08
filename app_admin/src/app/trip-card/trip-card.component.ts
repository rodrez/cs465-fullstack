import { Component, OnInit, Input } from "@angular/core";
import { Trip } from "../trip-listing/trip-listing.component";

@Component({
  selector: "app-trip-card",
  templateUrl: "./trip-card.component.html",
  styleUrls: ["./trip-card.component.css"],
})
export class TripCardComponent implements OnInit {
  @Input() trip: Trip;

  constructor() {}

  ngOnInit() {}
}

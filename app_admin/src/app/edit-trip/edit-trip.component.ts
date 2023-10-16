import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TripDataService } from "../trip-data.service";

@Component({
  selector: "app-edit-trip",
  templateUrl: "./edit-trip.component.html",
  styleUrls: ["./edit-trip.component.css"],
  providers: [TripDataService],
})
export class EditTripComponent implements OnInit {
  editForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
  ) {}

  ngOnInit() {
    // retrieve stashed tripId
    let code = localStorage.getItem("code");
    if (!code) {
      alert("Something went wrong, couldn't retrieve the tripId");
      this.router.navigate([""]);
      return;
    }

    // initialize the form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [code, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    });

    this.tripService.getTrip(code).then((data) => {
      this.editForm.patchValue(data);
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).then((data) => {
        console.log("data", data);
        this.router.navigate(["/"]);
      });
    }
  }
}

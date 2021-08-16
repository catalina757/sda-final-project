import {Component, OnInit} from '@angular/core';
import {ClinicModel} from '../../models/clinic.model';
import {ClinicService} from '../../services/clinic.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicDetailsComponent implements OnInit {
  public selectedClinic!: ClinicModel;
  public id!: number;

  constructor(public clinicService: ClinicService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.clinicService.getOneClinicServ(this.id).subscribe((clinic: ClinicModel) => {
      this.selectedClinic = clinic;
      console.log(this.selectedClinic.clinicName);
      console.log(this.selectedClinic.specialities);
    });
  }
}

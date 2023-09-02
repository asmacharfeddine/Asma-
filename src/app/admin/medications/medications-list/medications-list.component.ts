import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MedicationsService } from './medications.service';
import { FormComponent } from './dialog/form/form.component';
@Component({
  selector: 'app-medications-list',
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.scss']
})
export class MedicationsListComponent {
  page = 1;
  items = 0;
  medications :any [] = [];

  constructor(private medicationsService: MedicationsService,
    private _dialog: MatDialog,
    ){}

  openAddForm(){
    this._dialog.open(FormComponent);
  }

  loadMedications(): void {
    this.medicationsService.getAllMedications().subscribe(
      (data) => {
        console.log(data);
        this.medications = data;
      },
      (error) => {
        console.error('Error fetching medications, error');

      }
      )
  }

  ngOnInit(){
    this.loadMedications();

  }

 
  }



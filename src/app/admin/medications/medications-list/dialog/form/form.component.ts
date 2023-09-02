import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MedicationsService } from '../../medications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActiveIngredientsListComponent } from '../active-ingredients-list/active-ingredients-list.component';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  medicationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    private fb: FormBuilder,
    private _dialog: MatDialog,


    private medicationService: MedicationsService,
    private router: Router,
    ){
      this.medicationForm = this.fb.group({
        code:[''],
        name:[''],
        dosageForm:[''],
        type:[''],
        force:[''],
        value:[''],
      });
    }

    openActiveIngredientsForm(){
      this._dialog.open(ActiveIngredientsListComponent)
    }
  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }

/* load ActiveIngredients */
/*loadActiveIngredients(){
  this.
}*/

  /*loadCategories() {
    this.categoryService.getAllPhysicalTreatmentCategories().subscribe(
      (response) => {
        this.categoryList = response;

        // Extract an array of names from the categoryList
        this.categoryNames = this.categoryList.map(category => category.categoryName);

        this.categories = this.categoryList.map(category => category);

        console.log('Category names:', this.categoryNames);
      },
      (error) => {
        console.error('Error getting categories:', error);
      }
    );
  }*/
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalTreatmentService } from '../../physicalTreatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { PhysicalTreatment } from '../../physicalTreatment.model';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, ErrorObserver, of } from 'rxjs'; // Import throwError correctly
import { PhysicalTreatmentCategory } from 'app/admin/categories/categories-list/category.model';
import { CategoryService } from 'app/admin/categories/categories-list/category.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  physicalTreatmentForm: FormGroup;
  physicalTreatment: PhysicalTreatment = new PhysicalTreatment();
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private fb: FormBuilder,

    private physicalTreatmentService: PhysicalTreatmentService,
    private router: Router,
    private route : ActivatedRoute,

    private snackBar: MatSnackBar,
    private categoryService: CategoryService){
      this.physicalTreatmentForm = this.fb.group({
        treatmentName: ['', {
          validators: [Validators.required],
          //asyncValidators: [this.checkTreatmentName()],
          //updateOn: 'blur'
        }],
        treatmentDescription: [''],
        duration: [''],
        notes: [''],
        // category fields
        categoryName: [''],
      });
    }

    categoryList : PhysicalTreatmentCategory[] | undefined ;
    categoryNames : string[] = [];
    categories : PhysicalTreatmentCategory[] = [] ;
    phys : PhysicalTreatment = new PhysicalTreatment();

  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getAllPhysicalTreatmentCategories().subscribe(
      (response) => {
        this.categoryList = response;

        // Extract an array of names from the categoryList (categoryList is gonna be the list of categories that comes from the backend)
        this.categoryNames = this.categoryList.map(category => category.categoryName);

        // table of categories initilized empty and we gonna fill it with our database categories
        this.categories = this.categoryList.map(category => category);

        console.log('Category names:', this.categoryNames);
      },
      (error) => {
        console.error('Error getting categories:', error);
      }
    );
  }


  /*treatmentNameValidator(physicalTreatmentService: PhysicalTreatmentService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const treatmentName = control.value;
      return physicalTreatmentService.checkTreatmentNameExists(treatmentName).pipe(
        map(isExists => isExists ? { treatmentNameExists: true } : null),
        catchError(() => of(null))
      );
    };
  }*/

 /* checkTreatmentName() {
    const treatmentName = this.physicalTreatmentForm.get('treatmentName')?.value;
    this.physicalTreatmentService.checkTreatmentNameExists(treatmentName).subscribe(exists => {
      if (exists) {
        this.physicalTreatmentForm.get('treatmentName')?.setErrors({treatmentNameExists: true});

      }else {
        this.physicalTreatmentForm.get('treatmentName')?.setErrors(null);

      }
    })
  }

  goToPhysicalTreatmentsList(){
    this.router.navigate(['/admin/physicalTreatments/all-physicalTreatments'])
  }

  savePhysicalTreatment(){
    if (this.physicalTreatmentForm.valid){
    this.physicalTreatmentService.createPhysicalTreatment(this.physicalTreatment).subscribe( data =>{
      console.log(data);
      this.goToPhysicalTreatmentsList();
    },
    error => console.log(error));

  }

}
openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    panelClass: 'custom-snackbar',
    duration: 5000, // Duration in milliseconds
  });
}

refreshPhysicalTreatmentList() {
  // Reload the current route to refresh the category list
  this.router.navigateByUrl('/admin/physicalTreatments', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/admin/physicalTreatments/all-physicalTreatments']);
  });
}

  onSubmit(){
    console.log(this.physicalTreatment);
    this.savePhysicalTreatment();
    this.openSnackBar('PhysicalTreatmentCategory added successfully');
    this.refreshPhysicalTreatmentList();
  }*/

  onSubmit(){
    console.log("added successfully")
  }
  goToTreatmentsList(){
    this.router.navigate(['/admin/physicalTreatments/all-physicalTreatments'])
  }




  savePhysicalTreatment(){
    //console.log('hello')
    this.phys.treatmentName = this.physicalTreatmentForm?.get('treatmentName')?.value;
    this.phys.treatmentDescription = this.physicalTreatmentForm?.get('treatmentDescription')?.value;
    this.phys.duration = this.physicalTreatmentForm?.get('duration')?.value;
    this.phys.notes = this.physicalTreatmentForm?.get('notes')?.value;

    if (this.physicalTreatmentForm.valid){
      this.categoryService.addTreatmentToCategory
      (this.physicalTreatmentForm?.get('categoryName')?.value,this.phys).subscribe(data =>{
            console.log(data);
            this.goToTreatmentsList();

      },
      error => console.log(error))
    }

  }
}

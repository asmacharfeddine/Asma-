import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhysicalTreatmentCategory } from '../../category.model';
///import { PhysicalTreatmentCategory } from '../../category2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})

export class FormDialogComponent implements OnInit{
  category: PhysicalTreatmentCategory =new PhysicalTreatmentCategory();
  categoryForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private fb: FormBuilder,

    private categoryService: CategoryService,
    private router: Router,
    private route : ActivatedRoute,

    private snackBar: MatSnackBar

  ) {this.categoryForm = this.fb.group({
    categoryName: [{
       Validators: [Validators.required],
        asyncValidators: [this.categoryNameValidator(this.categoryService)],
  }],
    categoryDescription: ['']
  });
  }

  onCloseClick(): void {
    // You can optionally pass data back to the component that opened the dialog
    this.dialogRef.close(/* optional data to pass back */);
  }

  saveCategory(){
    if (this.categoryForm.valid){
    this.categoryService.createPhysicalTreatmentCategory(this.category).subscribe( data =>{
      console.log(data);
      this.goToCategoryList();
    },
    error => console.log(error));

  }

}

  ngOnInit(): void {
  }

  goToCategoryList(){
    this.router.navigate(['/admin/categories/all-categories'])
  }
  // once we submit data the form data will be available in this method
  onSubmit(){
    //console.log(this.category);
    this.saveCategory();
    this.openSnackBar('PhysicalTreatmentCategory added successfully');
    this.refreshCategoryList();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      panelClass: 'custom-snackbar',
      duration: 5000, // Duration in milliseconds
    });
  }

  refreshCategoryList() {
    // Reload the current route to refresh the category list
    this.router.navigateByUrl('/admin/categories', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/categories/all-categories']);
    });
  }

    categoryNameValidator(categoryService: CategoryService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const categoryName = control.value;
      return categoryService.checkCategoryNameExists(categoryName).pipe(
        map(isExists => isExists ? { categoryNameExists: true } : null),
        catchError(() => of(null))
      );
    };
  }

  isTextareaDisabled(): boolean {
    const categoryNameControl = this.categoryForm.get('categoryName');
    return !this.categoryForm.get('categoryName')?.valid || this.categoryForm.get('categoryName')?.untouched === true

  }

  deleteCategory(){

  }




  



}

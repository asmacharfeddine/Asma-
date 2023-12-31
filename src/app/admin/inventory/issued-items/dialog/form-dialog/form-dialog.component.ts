import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { IssuedItemsService } from '../../issued-items.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { IssuedItems } from '../../issued-items.model';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  issuedItems: IssuedItems;
}

@Component({
  selector: 'app-form-dialog:not(g)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  issuedItemsForm: UntypedFormGroup;
  issuedItems: IssuedItems;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public issuedItemsService: IssuedItemsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.issuedItems.i_name;
      this.issuedItems = data.issuedItems;
    } else {
      this.dialogTitle = 'New Item Issue';
      const blankObject = {} as IssuedItems;
      this.issuedItems = new IssuedItems(blankObject);
    }
    this.issuedItemsForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.issuedItems.id],
      i_name: [this.issuedItems.i_name],
      category: [this.issuedItems.category],
      issue_date: [
        formatDate(this.issuedItems.issue_date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      return_date: [
        formatDate(this.issuedItems.return_date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      issue_to: [this.issuedItems.issue_to],
      qty: [this.issuedItems.qty],
      status: [this.issuedItems.status],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.issuedItemsService.addIssuedItems(this.issuedItemsForm.getRawValue());
  }
}

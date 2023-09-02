import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicationsRoutingModule } from './medications-routing.module';
import { MedicationsListComponent } from './medications-list/medications-list.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormComponent } from './medications-list/dialog/form/form.component';
import { ActiveIngredientsListComponent } from './medications-list/dialog/active-ingredients-list/active-ingredients-list.component';

@NgModule({
  declarations: [
    MedicationsListComponent,
    FormComponent,
    ActiveIngredientsListComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicationsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
 // providers: [],
})
export class MedcationsModule {}

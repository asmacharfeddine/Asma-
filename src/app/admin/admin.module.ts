import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { ActiveIngredientsListComponent } from './activeIngredients/active-ingredients-list/active-ingredients-list.component';

//import { PhysicalTreatmentsListComponent } from './physicalTreatments/physical-treatments-list/physical-treatments-list.component';

@NgModule({
  declarations: [



    //PhysicalTreatmentsListComponent

    //ActiveIngredientsListComponent,
          //CategoriessListComponent,
          //DeleteComponent,
         // PhysicalTreatmentssListComponent,
          //FormComponent,
          //EditComponent,
          //FormComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}

import { formatDate } from '@angular/common';
import { ActiveIngredient } from 'app/admin/activeIngredients/active-ingredients-list/activeIngredient.model';
export class Medication {
  medication_Key: number;
  code: string;
  name: string;
  dosageForm: string;
  type: string;
  force: number;
  activeIngredients: ActiveIngredient[];

constructor(medication: Medication) {

    if(medication){
    this.medication_Key = medication.medication_Key || this.getRandomID();
   // this.img = patient.img || 'assets/images/user/user1.jpg';
    this.code = medication.code || '';
    this.name = medication.name || '';
    this.dosageForm = medication.dosageForm || '';
    this.type = medication.type || '';
    this.force = medication.force !== undefined ? medication.force : NaN;
    this.activeIngredients = medication.activeIngredients || new ActiveIngredient();
  } else {
    this.medication_Key = this.getRandomID();
    this.code = '';
    this.name = '';
    this.dosageForm = '';
    this.type = '';
    this.force = NaN;
    this.activeIngredients = [];
  }
}
public getRandomID(): number {
  const S4 = () => {
    return ((1 + Math.random()) * 0x10000) | 0;
  };
  return S4() + S4();
}}

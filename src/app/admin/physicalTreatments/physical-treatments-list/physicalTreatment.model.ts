import { formatDate } from '@angular/common';
import { PhysicalTreatmentCategory } from 'app/admin/categories/categories-list/category.model';
export class PhysicalTreatment {
  physicalTreatment_Key: number;
  treatmentName: string;
  treatmentDescription: string;
  duration: string;
  notes: string;
  physicalTreatmentCategory: PhysicalTreatmentCategory;

  constructor(physicalTreatment?: PhysicalTreatment) {
    if (physicalTreatment) {
      this.physicalTreatment_Key = physicalTreatment.physicalTreatment_Key || this.getRandomID();
      this.treatmentName = physicalTreatment.treatmentName || '';
      this.treatmentDescription = physicalTreatment.treatmentDescription || '';
      this.duration = physicalTreatment.duration || '';
      this.notes = physicalTreatment.notes || '';
      this.physicalTreatmentCategory = physicalTreatment.physicalTreatmentCategory || new PhysicalTreatmentCategory();
    } else {
      this.physicalTreatment_Key = this.getRandomID();
      this.treatmentName = '';
      this.treatmentDescription = '';
      this.duration = '';
      this.notes = '';
      this.physicalTreatmentCategory = new PhysicalTreatmentCategory();
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
 // get last insearted key ==> +1

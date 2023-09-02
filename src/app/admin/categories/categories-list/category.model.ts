import { formatDate } from '@angular/common';

export class PhysicalTreatmentCategory {
  physicalTreatmentCategory_Key: number;
  categoryName: string;
  categoryDescription: string;


  constructor(category?: PhysicalTreatmentCategory) {
    if (category){
    this.physicalTreatmentCategory_Key = category.physicalTreatmentCategory_Key || this.getRandomID();
    this.categoryName = category.categoryName || '';
    this.categoryDescription = category.categoryDescription || '' ;
  }else {
    this.physicalTreatmentCategory_Key = this.getRandomID();
      this.categoryName = '';
      this.categoryDescription = '';
  }
}
public getRandomID(): number {
  const S4 = () => {
    return ((1 + Math.random()) * 0x10000) | 0;
  };
  return S4() + S4();
}
}

export class ActiveIngredient {
  activeIngredients_Key: number;
  value: string;

  constructor(activeIngredient?: ActiveIngredient) {
    if (activeIngredient) {
      this.activeIngredients_Key = activeIngredient.activeIngredients_Key || this.getRandomID();
      this.value = activeIngredient.value || '';

    } else {
      this.activeIngredients_Key = this.getRandomID();
      this.value = '';

    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
  
}



import { FinanceCardModel } from './FinanceCardModel';

export class ExpenseCardModel extends FinanceCardModel {

  constructor(title, value) {
    super(title);
    this.value = value;
  }

  getIcon() {
    return '⚠️';
  }

  getFormattedValue() {
    return `- R$ ${this.value.toFixed(2).replace('.', ',')}`;
  }
}
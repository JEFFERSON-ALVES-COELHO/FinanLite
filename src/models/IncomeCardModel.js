import { FinanceCardModel } from './FinanceCardModel';

export class IncomeCardModel extends FinanceCardModel {

  constructor(title, value) {
    super(title);
    this.value = value;
  }

  getIcon() {
    return '📈';
  }

  getFormattedValue() {
    return `R$ ${this.value.toFixed(2).replace('.', ',')}`;
  }
}
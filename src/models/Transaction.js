export class Transaction {
  #description;
  #amount;
  #type;

  constructor(description, amount, type) {
    this.description = description;
    this.amount = amount;
    this.type = type;
  }

  set description(value) {
    if (!value || value.trim() === '') {
      throw new Error('Descrição obrigatória.');
    }

    this.#description = value.trim();
  }

  set amount(value) {
    const number = Number(value);

    if (isNaN(number) || number <= 0) {
      throw new Error('O valor deve ser maior que zero.');
    }

    this.#amount = number;
  }

  set type(value) {
    if (value !== 'income' && value !== 'expense') {
      throw new Error('Tipo de transação inválido.');
    }

    this.#type = value;
  }

  get description() {
    return this.#description;
  }

  get amount() {
    return this.#amount;
  }

  get type() {
    return this.#type;
  }
}
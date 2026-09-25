export class User {
  #name;
  #email;
  #password;

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  set name(value) {
    if (!value || value.trim().length < 3) {
      throw new Error('Nome deve possuir pelo menos 3 caracteres.');
    }

    this.#name = value.trim();
  }

  set email(value) {
    if (!value || !value.includes('@')) {
      throw new Error('E-mail inválido.');
    }

    this.#email = value.trim().toLowerCase();
  }

  set password(value) {
    if (!value || value.length < 6) {
      throw new Error('A senha deve possuir pelo menos 6 caracteres.');
    }

    this.#password = value;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }
}
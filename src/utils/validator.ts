export class Validator {
  isValidEmail(email: string): Boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPassword(password: string): Boolean {
    return password.length >= 8;
  }

  isValidName(name: string): Boolean {
    return name.length >= 2;
  }

  isValidPhone(phone: string): Boolean {
    return phone.length >= 10;
  }
}

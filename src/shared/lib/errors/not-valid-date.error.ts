export class NotValidDateError extends Error {
  constructor() {
    super('Date is not valid');
  }
}

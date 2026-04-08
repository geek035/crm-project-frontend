export class NotPositiveOrZeroValueError extends Error {
  constructor() {
    super('Значение должно быть не меньше нуля');
  }
}

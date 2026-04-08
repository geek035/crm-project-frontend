export class NotValidValueError extends Error {
  constructor(value: unknown) {
    super(`Значение '${value}' не валидно`);
  }
}

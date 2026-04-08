export class NotBrowserError extends Error {
  constructor() {
    super('Platform is not a browser');
  }
}

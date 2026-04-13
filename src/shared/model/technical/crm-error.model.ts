export class CRMErrorModel extends Error {
  private readonly _title: string | undefined = undefined;
  get title(): string | undefined {
    return this._title;
  }

  constructor(message: string, title: string | undefined = undefined) {
    super(message);

    this._title = title;
  }
}

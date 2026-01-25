export default class ApiResponse<T> {
  public readonly success = true;
  public readonly status: number;
  public readonly message: string;
  public readonly data: T;
  constructor(status: number, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

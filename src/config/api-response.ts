interface API_RES<T> {
  status: number;
  message: string;
  data: T;
}

export default class ApiResponse<T> {
  public readonly status: number;
  public readonly message: string;
  public readonly data: T;
  constructor({ status, message, data }: API_RES<T>) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

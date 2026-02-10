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

export class PaginatedApiResponse<T> extends ApiResponse<T> {
  public readonly total: number;
  public readonly page: number;
  public readonly limit: number;
  constructor(
    status: number,
    message: string,
    data: T,
    page: number,
    limit: number,
    total: number
  ) {
    super(status, message, data);
    this.total = total;
    this.limit = limit;
    this.page = page;
  }
}

import axios, { AxiosInstance } from "axios";

export class BaseApi {
  private readonly url = "http://localhost:9001/";
  protected request: AxiosInstance;

  constructor() {
    this.request = axios.create({
      baseURL: this.url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getData = (endPoint: string) => {
    return this.request.get(endPoint);
  };
}

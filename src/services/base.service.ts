import { apiClient } from "@/lib/api/client";
import { TApiResponse } from "@/types/api-response.type";

export class BaseService<T> {
  protected api = apiClient;
  protected endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async post(
    endpoint: string,
    data: unknown | Partial<T>,
  ): Promise<TApiResponse<T>> {
    const response = await this.api.post<TApiResponse<T>>(
      `${this.endpoint}${endpoint}`,
      data,
    ); // endpoint must have / at the beginning
    return response.data;
  }

  async put(
    endpoint: string,
    data: unknown | Partial<T>,
  ): Promise<TApiResponse<T>> {
    const response = await this.api.put<TApiResponse<T>>(
      `${this.endpoint}${endpoint}`,
      data,
    ); // endpoint must have / at the beginning
    return response.data;
  }

  async get(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<TApiResponse<T>> {
    const response = await this.api.get<TApiResponse<T>>(
      `${this.endpoint}${endpoint}`,
      { params },
    ); // endpoint must have / at the beginning
    return response.data;
  }

  async getAll(params?: Record<string, unknown>): Promise<TApiResponse<T[]>> {
    const response = await this.api.get<TApiResponse<T[]>>(this.endpoint, {
      params,
    });
    return response.data;
  }

  async getAllWithEndpoint(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<TApiResponse<T[]>> {
    const response = await this.api.get<TApiResponse<T[]>>(
      `${this.endpoint}${endpoint}`,
      { params },
    ); // endpoint must have / at the beginning
    return response.data;
  }

  async delete(
    endpoint: string,
    body?: unknown | Partial<T>,
  ): Promise<TApiResponse<null>> {
    const response = await this.api.delete<TApiResponse<null>>(
      `${this.endpoint}${endpoint}`,
      { data: body },
    ); // endpoint must have / at the beginning
    return response.data;
  }
}

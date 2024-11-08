import request from 'supertest';
import { API_BASE_URL, API_KEY } from '../config/config';

export class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string = API_BASE_URL, apiKey: string = API_KEY) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async get(endpoint: string, params: Record<string, any> = {}) {
    return request(this.baseUrl)
      .get(endpoint)
      .set('apikey', this.apiKey)
      .query(params);
  }

  async getWithoutApiKey(endpoint: string, params: Record<string, any> = {}) {
    return request(this.baseUrl).get(endpoint).query(params);
  }

  async getWithInvalidApiKey(endpoint: string, params: Record<string, any> = {}) {
    return request(this.baseUrl)
      .get(endpoint)
      .set('apikey', 'INVALID_API_KEY')
      .query(params);
  }
}

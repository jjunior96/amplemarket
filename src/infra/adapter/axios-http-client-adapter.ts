import { HttpClient, HttpRequest } from '@/application/protocol';
import axios from 'axios';

export class AxiosHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    const response = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body
    });

    return {
      statusCode: response?.status,
      body: response?.data
    };
  }
}

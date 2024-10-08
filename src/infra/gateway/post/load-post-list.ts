import {
  LoadPostListGateway,
  LoadPostListGatewayResult
} from '@/application/gateway';
import { HttpClient, SUCCESS_STATUS_CODES } from '@/application/protocol';

import { errorResponse } from '@/infra/error';

export class LoadPostListGatewayHttp implements LoadPostListGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async loadAll(): Promise<Output> {
    const httpResponse = await this.httpClient.request({
      url: '/api/posts',
      method: 'get'
    });

    if (!SUCCESS_STATUS_CODES.includes(httpResponse.statusCode)) {
      throw errorResponse(httpResponse.statusCode, httpResponse?.body?.message);
    }

    return httpResponse;
  }
}

type Output = LoadPostListGatewayResult;

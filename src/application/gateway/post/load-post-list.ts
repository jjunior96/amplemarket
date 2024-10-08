import { HttpResponse } from '@/application/protocol';

export interface LoadPostListGateway {
  loadAll: () => Promise<LoadPostListGatewayResult>;
}

export type LoadPostListGatewayOutput = string;

export type LoadPostListGatewayResult = HttpResponse<LoadPostListGatewayOutput>;

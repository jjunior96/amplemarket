import { LoadPostListGateway } from '@/application/gateway';
import { LoadPostListGatewayHttp } from '@/infra/gateway';
import { makeAxiosHttpClient } from '../http-client/axios-http-client-factory';

export const makeLoadPostListGateway = (): LoadPostListGateway =>
  new LoadPostListGatewayHttp(makeAxiosHttpClient());

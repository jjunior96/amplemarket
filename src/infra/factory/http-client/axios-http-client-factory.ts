import { HttpClient } from '@/application/protocol';
import { AxiosHttpClientAdapter } from '@/infra/adapter';

export const makeAxiosHttpClient = (): HttpClient =>
  new AxiosHttpClientAdapter();

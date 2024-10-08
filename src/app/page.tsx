'use client';
import { makeLoadPostListGateway } from '@/infra/factory/post';
import { Preview } from '@/presentation/components';

export default function Home() {
  return <Preview loadPostList={makeLoadPostListGateway()} />;
}

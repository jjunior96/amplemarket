'use client';
import { useCallback, useEffect, useState } from 'react';

import { LoadPostListGateway } from '@/application/gateway/post';
import { makeLoadPostListGateway } from '@/infra/factory/post';
import { OutputProps, parseStringDocument } from '@/services';

export default function Home() {
  return <Preview loadPostList={makeLoadPostListGateway()} />;
}

type PreviewProps = {
  loadPostList: LoadPostListGateway;
};

const Preview = ({ loadPostList }: PreviewProps) => {
  const [posts, setPosts] = useState<OutputProps[]>([]);

  const handleParseDocument = useCallback(async () => {
    const result = await loadPostList.loadAll();
    const output = parseStringDocument(result.body as string);
    setPosts(output);
  }, [loadPostList]);

  useEffect(() => {
    handleParseDocument();
  }, [handleParseDocument]);

  return (
    <div>
      <h1>Hacker News Posts</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
};

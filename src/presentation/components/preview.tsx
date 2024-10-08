'use client';

import { LoadPostListGateway } from '@/application/gateway';
import { OutputProps, parseStringDocument } from '@/services';
import { useCallback, useEffect, useState } from 'react';

type PreviewProps = {
  loadPostList: LoadPostListGateway;
};

export const Preview = ({ loadPostList }: PreviewProps) => {
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

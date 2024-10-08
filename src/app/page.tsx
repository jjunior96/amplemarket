'use client';
import { useCallback, useEffect, useState } from 'react';

import { LoadPostListGateway } from '@/application/gateway/post';
import { makeLoadPostListGateway } from '@/infra/factory/post';

type OutputProps = {
  position: number;
  title: string;
  points: number;
  link: string;
};

function parseStringDocument(input: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(input, 'text/html');
  const listItems = document.querySelectorAll('tr.athing');

  const resultArray: OutputProps[] = [];

  listItems.forEach((item) => {
    const titleElement = item.querySelector(
      '.titleline a'
    ) as HTMLAnchorElement;
    const title = titleElement?.innerText;
    const link = titleElement?.href;

    const siblingElement = item.nextElementSibling;

    if (siblingElement) {
      const scoreElement = siblingElement.querySelector(
        '.score'
      ) as HTMLSpanElement;
      const pointsText = scoreElement?.innerText;
      const points = parseInt(pointsText?.replace(' points', ''));

      resultArray.push({
        position: resultArray.length + 1,
        title: title,
        points: points,
        link
      });
    }
  });

  return resultArray;
}

export default function Home() {
  return (
    <Preview loadPostList={makeLoadPostListGateway()} />
  )
}

type PreviewProps = {
 loadPostList: LoadPostListGateway
}

const Preview = ({ loadPostList }: PreviewProps) => {
  const [posts, setPosts] = useState<OutputProps[]>([]);

  const handleParseDocument = useCallback(async () => {
    const result = await loadPostList.loadAll();
    const output = parseStringDocument(result.body as string);
    setPosts(output);
  }, []);

  useEffect(() => {
    handleParseDocument();
  }, [handleParseDocument]);

  return (
    <div>
      <h1>Hacker News Posts</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
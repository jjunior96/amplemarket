export type OutputProps = {
  position: number;
  title: string;
  points: number;
  link: string;
};

export function parseStringDocument(input: string) {
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

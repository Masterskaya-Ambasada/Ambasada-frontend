export function splitByFirstParagraph(
  htmlString: string,
): [string | null, string] {
  const match = htmlString.match(/<p[^>]*>[\s\S]*?<\/p>/i);

  if (!match) {
    return [null, htmlString];
  }

  const firstParagraph = match[0];
  const rest = htmlString.slice(match.index! + firstParagraph.length);

  return [firstParagraph, rest];
}

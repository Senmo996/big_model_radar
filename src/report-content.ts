/**
 * Returns true when a generated report contains content between its header
 * separator and optional auto-generated footer separator.
 */
export function hasMeaningfulReportBody(content: string): boolean {
  const separators = [...content.matchAll(/^\s*---\s*$/gm)];

  // Preserve compatibility with hand-written or legacy reports that do not
  // use the generated report structure.
  if (separators.length === 0) return content.trim().length > 0;

  const first = separators[0];
  if (first?.index === undefined) return false;

  const bodyStart = first.index + first[0].length;
  const last = separators.at(-1);
  const bodyEnd = separators.length > 1 && last?.index !== undefined ? last.index : content.length;

  return content.slice(bodyStart, bodyEnd).trim().length > 0;
}

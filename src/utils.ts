export function getLineCount(input: string): number {
  let lineCount = input.split("\n").length;
  return lineCount;
}

export function getWordCount(input: string): number {
  const trimmed = input.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).length;
}

export function getByteCount(input: string): number {
  return Buffer.byteLength(input, "utf8");
}

export function getCharCount(input: string): number {
  return input.split("").length;
}

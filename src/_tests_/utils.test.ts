import { getByteCount, getCharCount, getLineCount, getWordCount } from "../utils";

const sampleText = "Hello World!\nHello ADAM\nHello MADAM";

describe("WC Tool Utility Functions", () => {
  test("Line Count", () => {
    expect(getLineCount(sampleText)).toBe(3);
  });

  test("Word Count", () => {
    expect(getWordCount(sampleText)).toBe(6);
  });

  test("Byte Count", () => {
    expect(getByteCount(sampleText)).toBe(35);
  });

  test("Character Count", () => {
    expect(getCharCount(sampleText)).toBe(35); // includes \n
  });
});

describe("WC Tool Utility Functions - Edge Cases", () => {
  test("Empty String", () => {
    const input = "";
    expect(getLineCount(input)).toBe(1);
    expect(getWordCount(input)).toBe(0);
    expect(getByteCount(input)).toBe(0);
    expect(getCharCount(input)).toBe(0);
  });

  test("Sting with only white space", () => {
    const input = "             \n\t      ";
    expect(getLineCount(input)).toBe(2); // "\n" creates two lines
    expect(getWordCount(input)).toBe(0);
    expect(getByteCount(input)).toBe(Buffer.byteLength(input, "utf-8"));
    expect(getCharCount(input)).toBe(input.length);
  });

  test("Unicode characters (e.g. emoji)", () => {
    const input = "Hello 👋🌍";
    expect(getLineCount(input)).toBe(1);
    expect(getWordCount(input)).toBe(2);
    expect(getByteCount(input)).toBe(Buffer.byteLength(input, "utf8"));
    expect(getCharCount(input)).toBe(input.split("").length); // emoji = 2 chars
  });

  test("Multiple newlines at end", () => {
    const input = "Line1\nLine2\n\n";
    expect(getLineCount(input)).toBe(4);
    expect(getWordCount(input)).toBe(2);
  });

  test("File ends without newline", () => {
    const input = "Just one line no newline";
    expect(getLineCount(input)).toBe(1);
    expect(getWordCount(input)).toBe(5);
  });

  test("Only newlines", () => {
    const input = "\n\n\n";
    expect(getLineCount(input)).toBe(4); // 3 \n → 4 lines
    expect(getWordCount(input)).toBe(0);
  });
});

import { promises as fs } from "fs";
import path from "path";
import { getLineCount, getWordCount, getByteCount, getCharCount } from "./utils";

export async function parseArgumentsAndRun(): Promise<void> {
  function printCountUsingFlagAndContent(flag: string, content: string) {
    switch (flag) {
      case "-w":
        console.log("Word Count: ", getWordCount(content));
        break;
      case "-l":
        console.log("Line Count: ", getLineCount(content));
        break;
      case "-m":
        console.log("Char Count: ", getCharCount(content));
        break;
      case "-c":
        console.log("Byte Count: ", getByteCount(content));
        break;
    }
  }

  function readFromStdin(): Promise<string> {
    return new Promise((resolve) => {
      let input = "";
      process.stdin.on("data", (chunk) => (input += chunk));
      process.stdin.on("end", () => resolve(input));
    });
  }

  const args = process.argv.slice(2);
  let flag: string | null = null;
  let filePath: string | null = null;

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    const helpMessage = `mywc - A custom implementation of the Unix wc command
    Usage:
    mywc [option] <filename.extension>

    Options:
    -l    Count lines
    -w    Count words
    -c    Count bytes
    -m    Count characters
    -h, --help    Show this help message`;
    console.log(helpMessage);
    process.exit(0);
  }
  if (args.length === 1 && args[0].startsWith("-") && !process.stdin.isTTY) {
    const input = await readFromStdin();
    printCountUsingFlagAndContent(args[0], input);
    return;
  } else if (args.length === 1) {
    if (args[0].startsWith("-")) {
      console.error("Please provide a file name after the flag.\nUsage: mywc [-l|-w|-c|-m] <filename>");
      process.exit(1);
    }
    if (!args[0].includes(".")) {
      console.error("The file name needs to be provided with extension. Eg: filename.extension");
      process.exit(1);
    }
    filePath = args[0];
  } else if (args.length === 2) {
    flag = args[0];
    filePath = args[1];
    const validFlags = ["-l", "-w", "-c", "-m"];
    if (!validFlags.includes(flag)) {
      console.error(`Invalid flag: ${flag}`);
      process.exit(1);
    }
  } else {
    console.error("Usage: mywc [-l|-w|-c|-m] <filename.extension>");
    process.exit(1);
  }

  try {
    const resolvedPath = path.resolve(process.cwd(), filePath!);
    const content = await fs.readFile(resolvedPath, "utf-8");

    if (!flag) {
      console.log(`FilePath: ${filePath}`);
      console.log(`Line Count: ${getLineCount(content)}`);
      console.log(`Word Count: ${getWordCount(content)}`);
      console.log(`Byte Count: ${getByteCount(content)}`);
      console.log(`Char Count: ${getCharCount(content)}`);
      return;
    }
    printCountUsingFlagAndContent(flag, content);
  } catch (err) {
    console.error(`Error reading file: ${filePath}`);
    console.error(err);
    process.exit(1);
  }
}

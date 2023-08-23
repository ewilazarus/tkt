import { Command, Option } from 'commander';
import { Base64Helper } from './base64';
import { JsonHelper } from './json';
import { readFileSync } from 'fs';
import { ConsoleDiffHelper } from './diff/console';

// Version read from the package.json file.
const version = '0.1.8';

/**
 * Helper function that reads a file and returns its contents as a string.
 *
 * @param path - The path of the file to be read
 * @returns - A string with the read contents of the file.
 */
const readFile = (path: string): string => {
  try {
    const buffer = readFileSync(path);
    return buffer.toString();
  } catch {
    throw new Error(`File not found: ${path}`);
  }
};

/**
 * Helper function that reads the stdin and returns its contents as a string.
 *
 * @returns A string with the contents of stdin.
 */
const readStdin = (): string => readFile('/dev/stdin');

/**
 * A sub-command factory
 * The fabricated subcommand is intended for Base64 encoding and decoding.
 */
const base64SubCommandFactory = () =>
  new Command('b64')
    .description(
      'Encodes or decodes a string using Base64. The string is read from stdin.',
    )
    .addOption(
      new Option('-e, --encode', 'encodes a string using Base64').conflicts(
        'decode',
      ),
    )
    .addOption(
      new Option('-d, --decode', 'decodes a string using Base64').conflicts(
        'encode',
      ),
    )
    .action((options) => {
      if (options.encode) {
        const stdin = readStdin();
        const result = Base64Helper.encodeString(stdin);
        console.log(result);
        return;
      }

      if (options.decode) {
        try {
          const stdin = readStdin();
          const result = Base64Helper.decodeString(stdin);
          console.log(result);
        } catch (e) {
          console.error(`${e}`);
        }
        return;
      }

      console.error(
        'Invalid Argument: Either encode or decode must be specified',
      );
    });

/**
 * A sub-command factory.
 * The fabricated sub-command is intended for minifying and prettifying JSON strings.
 */
const jsonSubCommandFactory = () =>
  new Command('json')
    .description('Minifies or prettifies a JSON string read from stdin.')
    .addOption(
      new Option('-m, --minify', 'minifies a JSON string').conflicts(
        'prettify',
      ),
    )
    .addOption(
      new Option('-p, --prettify', 'prettifies a JSON string').conflicts(
        'minify',
      ),
    )
    .action((options) => {
      if (options.minify) {
        try {
          const stdin = readStdin();
          const result = JsonHelper.minify(stdin);
          console.log(result);
        } catch (e) {
          console.error(`${e}`);
        }
        return;
      }

      if (options.prettify) {
        try {
          const stdin = readStdin();
          const result = JsonHelper.prettify(stdin);
          console.log(result);
        } catch (e) {
          console.error(`${e}`);
        }
        return;
      }

      console.error(
        'Invalid Argument: Either minify or prettify must be specified',
      );
    });

/**
 * A sub-command factory.
 * The fabricated sub-command is intended for diffing two files.
 */
const diffSubCommandFactory = () =>
  new Command('diff')
    .description('Compares two files and outputs the differences.')
    .argument('<left>', 'the first file to compare')
    .argument('<right>', 'the second file to compare')
    .action((left, right) => {
      let leftFileContent = '';
      let rightFileContent = '';

      try {
        leftFileContent = readFile(left);
      } catch (e) {
        console.error(`Failed to read 'left' file: ${e}`);
      }

      try {
        rightFileContent = readFile(right);
      } catch (e) {
        console.error(`Failed to read 'right' file: ${e}`);
      }

      const differ = new ConsoleDiffHelper();
      const result = differ.diff(leftFileContent, rightFileContent);

      for (const line of result) {
        console.log(line);
      }
    });

/**
 * The CLI program inferface factory.
 */
export const programFactory = () =>
  new Command()
    .name('ubt')
    .description("A programmer's utility belt")
    .version(version, '-v, --version', 'output the current version')
    .addCommand(base64SubCommandFactory())
    .addCommand(jsonSubCommandFactory())
    .addCommand(diffSubCommandFactory());

/**
 * A helper class for manipulating JSON strings.
 */
export class JsonHelper {
  /**
   * Returns a minified JSON string from a JSON string.
   *
   * @param json - A JSON string to be minified.
   * @returns A minified JSON string. This is a JSON string with no spaces nor newlines.
   */
  static minify(json: string): string {
    try {
      const jsonObj = JSON.parse(json);
      const minifiedJson = JSON.stringify(jsonObj, null, 0);
      return minifiedJson;
    } catch {
      throw new Error(`Invalid JSON string: ${json}`);
    }
  }

  /**
   * Returns a prettified JSON string from a JSON string.
   *
   * @param json - A JSON string to be prettified.
   * @returns A prettified JSON string. This is a JSON string with indentation and newlines.
   */
  static prettify(json: string): string {
    try {
      const jsonObj = JSON.parse(json);
      const prettifiedJson = JSON.stringify(jsonObj, null, '\t');
      return prettifiedJson;
    } catch {
      throw new Error(`Invalid JSON string: ${json}`);
    }
  }
}

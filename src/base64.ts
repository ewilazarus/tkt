/**
 * A helper class for Base64 encoding and decoding.
 */
export class Base64Helper {
  /**
   * Returns a Base64-encoded string from a plain text string.
   *
   * @param str - The string to be Base64-encoded. This is a plain text string.
   * @returns The Base64-encoded `str` string.
   */
  static encodeString(str: string): string {
    return btoa(str);
  }

  /**
   * Returns a plain text string decoded from a Base64-encoded string.
   *
   * @param str - The Base64-encoded string to be decoded.
   * @returns The plain text string decoded from `str`.
   */
  static decodeString(str: string): string {
    return atob(str);
  }
}

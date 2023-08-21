import { Base64Helper } from './base64';

const PLAIN_TEXT_STR = 'Hello, world!';
const BASE_64_STR = 'SGVsbG8sIHdvcmxkIQ==';

describe('Base64Helper', () => {
  test('can encode string', () => {
    // Act
    const actual = Base64Helper.encodeString(PLAIN_TEXT_STR);

    // Assert
    expect(actual).toBe(BASE_64_STR);
  });

  test('can decode string', () => {
    // Act
    const actual = Base64Helper.decodeString(BASE_64_STR);

    // Assert
    expect(actual).toBe(PLAIN_TEXT_STR);
  });
});

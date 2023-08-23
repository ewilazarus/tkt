import { StringDiffHelper } from './stringFormatter';
import { red, green } from 'colors/safe';

const LEFT_STR = `HELLO\nWORLD`;
const RIGHT_STR = `HELLO,\nWORLD!`;

describe('StringDiffHelper', () => {
  test('can diff strings', () => {
    // Arrange
    const diffHelper = new StringDiffHelper();
    const expected = [red('HELLO\nWORLD'), green('HELLO,\nWORLD!')];

    // Act
    const actual = diffHelper.diff(LEFT_STR, RIGHT_STR);

    // Assert
    expect(actual).toEqual(expected);
  });
});

import { ColorizedChange, DiffColor, DiffHelper, exportedForTesting } from '.';
const { colorizeChange } = exportedForTesting;

describe('colorizeChanges', () => {
  test.each([
    [{ added: true, value: 'xyz' }, DiffColor.GREEN],
    [{ removed: true, value: 'xyz' }, DiffColor.RED],
    [{ value: 'xyz' }, DiffColor.GREY],
  ])('can colorize changes', (change, color) => {
    // Act
    const expected = colorizeChange(change).color;

    // Assert
    expect(expected).toBe(color);
  });
});

class DummyDiffHelper extends DiffHelper<ColorizedChange[]> {
  constructor() {
    super((colorizedChanges) => colorizedChanges);
  }
}

const LEFT_STR = `HELLO\nWORLD`;
const RIGHT_STR = `HELLO,\nWORLD!`;

describe('DiffHelper', () => {
  test('can diff strings', () => {
    // Arrange
    const diffHelper = new DummyDiffHelper();
    const expected: ColorizedChange[] = [
      {
        change: {
          value: 'HELLO\nWORLD',
          count: 2,
          removed: true,
        },
        color: DiffColor.RED,
      },
      {
        change: {
          value: 'HELLO,\nWORLD!',
          count: 2,
          added: true,
        },
        color: DiffColor.GREEN,
      },
    ];

    // Act
    const actual = diffHelper.diff(LEFT_STR, RIGHT_STR);

    // Assert
    expect(actual).toEqual(expected);
  });
});

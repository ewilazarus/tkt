import { diffLines, Change } from 'diff';

/**
 * An enum for the colors used in the diff string.
 */
export enum DiffColor {
  // Common part
  GREY = 'grey',

  // Addition
  GREEN = 'green',

  // Deletion
  RED = 'red',
}

/**
 * A type for a change with a color.
 */
export type ColorizedChange = {
  change: Change;
  color: DiffColor;
};

/**
 * Returns a colorized change.
 *
 * @param change - The change to be colorized
 * @returns A colorized change.
 */
const colorizeChange = (change: Change): ColorizedChange => {
  if (change.added) {
    return { change, color: DiffColor.GREEN };
  } else if (change.removed) {
    return { change, color: DiffColor.RED };
  } else {
    return { change, color: DiffColor.GREY };
  }
};

/**
 * A function that formats the diff changes.
 */
export type DiffFormatter<T> = (colorizedChanges: ColorizedChange[]) => T;

/**
 * A helper class for diffing strings.
 */
export class DiffHelper<T> {
  /**
   * Creates a new instance of `DiffHelper`.
   *
   * @param formatter - A function that formats the diff changes.
   */
  constructor(private readonly formatter: DiffFormatter<T>) {}

  /**
   * Returns a diff string from two strings.
   *
   * @param left - The first string to be compared.
   * @param right - The second string to be compared.
   * @returns A formatted diff string.
   */
  diff(left: string, right: string): T {
    const changes = diffLines(left, right);
    const colorizedChanges = changes.map(colorizeChange);
    return this.formatter(colorizedChanges);
  }
}

export const exportedForTesting = {
  colorizeChange,
};

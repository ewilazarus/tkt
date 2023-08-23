import { DiffHelper, ColorizedChange, DiffColor } from './index';
import { grey, green, red } from 'colors/safe';

const colorsAdapter = {
  [DiffColor.GREY]: grey,
  [DiffColor.GREEN]: green,
  [DiffColor.RED]: red,
};

/**
 * A function that formats the diff changes.
 *
 * @param colorizedChanges - A list of colorized changes.
 * @returns A list of strings with colors.
 */
const stringFormatter = (colorizedChanges: ColorizedChange[]) => {
  return colorizedChanges.map(({ change, color }) => {
    const colorizer = colorsAdapter[color];
    return colorizer(change.value);
  });
};

/**
 * A helper class for diffing strings when using the console.
 */
export class StringDiffHelper extends DiffHelper<string[]> {
  constructor() {
    super(stringFormatter);
  }
}

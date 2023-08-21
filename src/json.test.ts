import { JsonHelper } from './json';

const MINIFIED_JSON = `{"name":"John Doe","age":30,"cars":[{"name":"Ford","models":["Fiesta","Focus","Mustang"]}]}`;
const PRETTIFIED_JSON = `{
\t"name": "John Doe",
\t"age": 30,
\t"cars": [
\t\t{
\t\t\t"name": "Ford",
\t\t\t"models": [
\t\t\t\t"Fiesta",
\t\t\t\t"Focus",
\t\t\t\t"Mustang"
\t\t\t]
\t\t}
\t]
}`;

describe('JsonHelper', () => {
  test('can minify json', () => {
    // Act
    const actual = JsonHelper.minify(PRETTIFIED_JSON);

    // Assert
    expect(actual).toBe(MINIFIED_JSON);
  });

  test('can prettify json', () => {
    // Act
    const actual = JsonHelper.prettify(MINIFIED_JSON);

    // Assert
    expect(actual).toBe(PRETTIFIED_JSON);
  });
});

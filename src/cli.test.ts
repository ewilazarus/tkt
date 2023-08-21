import { programFactory } from './cli';
import { red, green } from 'colors/safe';
import * as fs from 'fs';

jest.mock('fs');

describe('b64', () => {
  test('can encode string', () => {
    // Arrange
    jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('test'));
    console.log = jest.fn();
    const program = programFactory();

    // Act
    try {
      program.parse(['b64', '-e'], { from: 'user' });

      // Assert
    } catch (e) {
      throw new Error(`Test failed: ${e}`);
    }
    expect(console.log).toHaveBeenCalledWith('dGVzdA==');
  });

  test('can decode string', () => {
    // Arrange
    jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('dGVzdA=='));
    console.log = jest.fn();
    const program = programFactory();

    // Act
    try {
      program.parse(['b64', '-d'], { from: 'user' });

      // Assert
    } catch (e) {
      throw new Error(`Test failed: ${e}`);
    }
    expect(console.log).toHaveBeenCalledWith('test');
  });

  test('fails when decoding invalid string', () => {
    // Arrange
    jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('test'));
    const program = programFactory();

    // Act
    try {
      program.parse(['b64', '-d'], { from: 'user' });

      // Assert
    } catch (e) {
      throw new Error(`Test failed: ${e}`);
    }
  });

  test('errors when encode and decode are both specified', () => {
    // Arrange
    const err = new Error(`process.exit() was called.`);
    const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw err;
    });
    const program = programFactory();

    // Act
    try {
      program.parse(['b64', '-e', '-d'], { from: 'user' });

      // Assert
    } catch (e) {
      expect(e).toEqual(err);
    }
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});

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

describe('json', () => {
  test('can minify json', () => {
    // Arrange
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(Buffer.from(PRETTIFIED_JSON));
    console.log = jest.fn();
    const program = programFactory();

    // Act
    try {
      program.parse(['json', '-m'], { from: 'user' });

      // Assert
    } catch (e) {
      throw new Error(`Test failed: ${e}`);
    }
    expect(console.log).toHaveBeenCalledWith(MINIFIED_JSON);
  });

  test('can prettify json', () => {
    // Arrange
    jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from(MINIFIED_JSON));
    console.log = jest.fn();
    const program = programFactory();

    // Act
    try {
      program.parse(['json', '-p'], { from: 'user' });

      // Assert
    } catch (e) {
      throw new Error(`Test failed: ${e}`);
    }
    expect(console.log).toHaveBeenCalledWith(PRETTIFIED_JSON);
  });

  test('errors when minify and prettify are both specified', () => {
    // Arrange
    const err = new Error(`process.exit() was called.`);
    const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw err;
    });
    const program = programFactory();

    // Act
    try {
      program.parse(['json', '-m', '-p'], { from: 'user' });

      // Assert
    } catch (e) {
      expect(e).toEqual(err);
    }
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});

describe('diff', () => {
  test('can diff files', () => {
    // Arrange
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(Buffer.from(`HELLO\nWORLD`))
      .mockReturnValueOnce(Buffer.from(`HELLO,\nWORLD!`));
    console.log = jest.fn();
    const program = programFactory();

    // Act
    try {
      program.parse(['diff', 'file1', 'file2'], { from: 'user' });

      // Assert
    } catch (e) {
      throw new Error(`Test failed: ${e}`);
    }
    expect(console.log).toHaveBeenNthCalledWith(1, red('HELLO\nWORLD'));
    expect(console.log).toHaveBeenNthCalledWith(2, green('HELLO,\nWORLD!'));
  });
});

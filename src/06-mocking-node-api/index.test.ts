// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

const DELAY = 1000;

describe('doStuffByTimeout', () => {
  let cb: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    cb = jest.fn();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, DELAY);

    expect(spy).toHaveBeenCalledWith(cb, DELAY);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, DELAY);

    jest.advanceTimersByTime(DELAY);

    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let cb: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    cb = jest.fn();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, DELAY);

    expect(spy).toHaveBeenCalledWith(cb, DELAY);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(cb, DELAY);

    jest.advanceTimersByTime(DELAY * 5);

    expect(cb).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const filePath = 'index.test.ts';
  const content = 'hello world!';

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(filePath);

    expect(spy.mock.calls.flat()[1]).toEqual(filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    expect(await readFileAsynchronously(filePath)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(content);

    expect(await readFileAsynchronously(filePath)).toBe(content);
  });
});

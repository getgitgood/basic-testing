// Uncomment the code below and write your tests
import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Add })).toBe(10);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 5, action: Action.Subtract })).toBe(10);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Multiply })).toBe(25);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Divide })).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: 'deflate' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: '2', action: Action.Multiply })).toBe(
      null,
    );
  });
});

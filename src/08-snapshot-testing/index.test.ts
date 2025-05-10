// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([])).toStrictEqual({ value: null, next: null });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(
      generateLinkedList(['first', 'second', 'third', 'fourth']),
    ).toStrictEqual({
      value: 'first',
      next: {
        value: 'second',
        next: {
          value: 'third',
          next: { value: 'fourth', next: { value: null, next: null } },
        },
      },
    });
  });
});

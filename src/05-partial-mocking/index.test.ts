// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    expect(spy).not.toHaveBeenCalled();

    mockTwo();
    expect(spy).not.toHaveBeenCalled();

    mockThree();
    expect(spy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(spy).toHaveBeenCalledWith('I am not mocked');
  });
});

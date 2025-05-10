// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: (...args: unknown[]) => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create').mockImplementation(
      () =>
        ({
          get: jest.fn().mockResolvedValue({}),
        }) as unknown as AxiosInstance,
    );

    await throttledGetDataFromApi('./');

    expect(spy.mock.lastCall?.[0]).toStrictEqual({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.fn().mockResolvedValue({});
    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: spy } as unknown as AxiosInstance);

    await throttledGetDataFromApi('./');

    expect(spy).toHaveBeenCalledWith('./');
  });

  test('should return response data', async () => {
    const spy = jest.fn().mockResolvedValue({ data: 'important data' });
    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: spy } as unknown as AxiosInstance);

    const value = await throttledGetDataFromApi('./');

    expect(value).toBe('important data');
  });
});

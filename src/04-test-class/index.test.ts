// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  let account: BankAccount;

  const BALANCE = 100_000;
  const MORE_THAN_BALANCE = BALANCE + 1;
  const HALF_BALANCE = Math.floor(BALANCE / 2);

  beforeEach(() => {
    account = getBankAccount(BALANCE);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toEqual(BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(MORE_THAN_BALANCE);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      account.transfer(MORE_THAN_BALANCE, getBankAccount(BALANCE));
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(MORE_THAN_BALANCE, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(account.getBalance()).toBe(BALANCE);
    account.deposit(HALF_BALANCE);
    expect(account.getBalance()).toBe(BALANCE + HALF_BALANCE);
  });

  test('should withdraw money', () => {
    expect(account.getBalance()).toBe(BALANCE);
    account.withdraw(HALF_BALANCE);
    expect(account.getBalance()).toBe(BALANCE - HALF_BALANCE);
  });

  test('should transfer money', () => {
    const otherAccount = getBankAccount(HALF_BALANCE);

    expect(account.getBalance()).toBe(BALANCE);
    expect(otherAccount.getBalance()).toBe(HALF_BALANCE);
    account.transfer(HALF_BALANCE, otherAccount);
    expect(account.getBalance()).toBe(BALANCE - HALF_BALANCE);
    expect(otherAccount.getBalance()).toBe(BALANCE);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);

    expect(account.getBalance()).toBe(BALANCE);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(_, 'random').mockReturnValue(0);

    expect(async () => {
      await account.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});

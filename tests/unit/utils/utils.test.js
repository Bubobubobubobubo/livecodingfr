import { describe, it, expect } from 'vitest';

describe('Utils Test Setup', () => {
  it('should have testing framework available', () => {
    expect(expect).toBeDefined();
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
  });

  it('should have DOM testing utilities available', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
  });

  it('should support async testing', async () => {
    const asyncFunction = async () => {
      return new Promise(resolve => setTimeout(() => resolve('done'), 10));
    };

    const result = await asyncFunction();
    expect(result).toBe('done');
  });

  it('should support basic math operations', () => {
    expect(2 + 2).toBe(4);
    expect(10 * 10).toBe(100);
  });

  it('should support array operations', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr[0]).toBe(1);
  });
});
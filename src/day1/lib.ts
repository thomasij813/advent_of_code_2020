import { curry } from 'ramda';

export const twoSum = curry((sum: number, nums: number[]): number[] => {
  const numsSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const diff = sum - value;

    if (numsSet.has(diff)) {
      return [diff, value];
    } else {
      numsSet.add(value);
    }
  }

  return [];
});

export const threeSum = curry((sum: number, nums: number[]): number[] => {
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const diff = sum - value;
    const otherDiffs = twoSum(diff, nums);
    if (otherDiffs.length) {
      return [value, ...otherDiffs];
    }
  }
  return [];
});

import { Just, Nothing, Maybe } from 'purify-ts';
import { curry, concat } from 'ramda';

export const twoSum = curry(
  (sum: number, nums: number[]): Maybe<[number, number]> => {
    const numsSet = new Set();

    for (let i = 0; i < nums.length; i++) {
      const value = nums[i];
      const diff = sum - value;

      if (numsSet.has(diff)) {
        return Just([diff, value]);
      } else {
        numsSet.add(value);
      }
    }

    return Nothing;
  }
);

export const threeSum = curry(
  (sum: number, nums: number[]): Maybe<number[]> => {
    for (let i = 0; i < nums.length; i++) {
      const value = nums[i];
      const diff = sum - value;
      const otherDiffs = twoSum(diff, nums);
      if (otherDiffs.isJust()) {
        return otherDiffs.map(concat([value]));
      }
    }
    return Nothing;
  }
);

import { compose, split, toString, multiply, map } from 'ramda';
import { map as opMap } from 'rxjs/operators';
import { threeSum, twoSum } from './lib';
import { readFile } from '../stdlib';

const bufferToNums = compose<Buffer, string, string[], number[]>(
  map(Number),
  split('\n'),
  toString
);

const multList = (nums: number[]): number => nums.reduce(multiply, 1);

const numbers = readFile('numbers.txt').pipe(opMap(bufferToNums));

numbers.subscribe(compose(map(console.log), map(multList), twoSum(2020)));
numbers.subscribe(compose(map(console.log), map(multList), threeSum(2020)));

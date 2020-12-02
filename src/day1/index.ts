import fs from 'fs';
import { promisify } from 'util';
import { compose, split, toString, multiply, map } from 'ramda';
import { from } from 'rxjs';
import { map as opMap } from 'rxjs/operators';
import { twoSum, threeSum } from './lib';

const readFile = promisify(fs.readFile);

const bufferToNums = compose<Buffer, string, string[], number[]>(
  map(Number),
  split('\n'),
  toString
);

const multList = (nums: number[]): number => nums.reduce(multiply, 1);

const twoSumReduce = (sumNum: number) =>
  compose<number[], number[], number>(multList, twoSum(sumNum));

const threeSumReduce = (sumNum: number) =>
  compose<number[], number[], number>(multList, threeSum(sumNum));

const numbers = from(readFile('numbers.txt')).pipe(opMap(bufferToNums));

numbers.subscribe(compose(console.log, twoSumReduce(2020)));
numbers.subscribe(compose(console.log, threeSumReduce(2020)));

import {
  split,
  last,
  head,
  map,
  compose,
  curry,
  length,
  filter,
  take,
} from 'ramda';

export interface pw {
  password: string;
  rule: string;
}

const numTuple = compose(map(parseInt), take(2), split('-'));
const parseRule = compose(numTuple, head, split(' '));
const betweenInc = curry(
  ([min, max]: [number, number], num: number): boolean =>
    num >= min && num <= max
);
const stringMatch = curry((s1: string, s2: string): boolean => s1 === s2);
const countLetter = (letter: string) =>
  compose<string, string[], string[], number>(
    length,
    filter(stringMatch(letter)),
    split('')
  );

export const validatePassword1 = ({ password, rule }: pw): boolean => {
  const [min, max] = parseRule(rule);
  const letter = last(rule);
  return betweenInc([min, max], countLetter(letter)(password));
};

export const validatePassword2 = ({ password, rule }: pw): boolean => {
  const [i1, i2] = parseRule(rule);
  const letter = last(rule);
  if (password[i1 - 1] === letter && password[i2 - 1] === letter) {
    return false;
  } else if (password[i1 - 1] === letter || password[i2 - 1] === letter) {
    return true;
  } else {
    return false;
  }
};

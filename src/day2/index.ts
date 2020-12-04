import { readFile } from '../stdlib';
import { map as opMap } from 'rxjs/operators';
import {
  compose,
  split,
  toString,
  zipObj,
  trim,
  map,
  filter,
  length,
} from 'ramda';
import { validatePassword1, pw, validatePassword2 } from './lib';

const bufferToStrings = compose(split('\n'), toString);
const stringToPw = compose<string, string[], string[], pw>(
  zipObj(['rule', 'password']),
  map(trim),
  split(':')
);
const countNonValidPasswords1 = compose<pw[], pw[], number>(
  length,
  filter(validatePassword1)
);

const countNonValidPasswords2 = compose<pw[], pw[], number>(
  length,
  filter(validatePassword2)
);

const passwords = readFile('passwords.txt')
  .pipe(opMap(bufferToStrings))
  .pipe(opMap(map(stringToPw)));

passwords.subscribe(compose(console.log, countNonValidPasswords1));
passwords.subscribe(compose(console.log, countNonValidPasswords2));

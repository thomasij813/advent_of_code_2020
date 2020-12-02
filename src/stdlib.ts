import fs from 'fs';
import { promisify } from 'util';
import { from, Observable } from 'rxjs';

export const readFile = (
  path: string,
  options?: { encoding?: null; flag?: string }
): Observable<Buffer> => from(promisify(fs.readFile)(path, options));

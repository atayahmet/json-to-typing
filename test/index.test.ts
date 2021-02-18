import transform from '../src';
import { data as basicJsonData, expectData } from './fixtures/basic';
import {
  data as arrayObjectJsonData,
  expectData as arrayObjectJsonExpectData,
} from './fixtures/array-object';
import {
  data as nestedObjectJsonData,
  expectData as nestedObjectJsonExpectData,
} from './fixtures/nested-object';
import {
  data as emptyObjectJsonData,
  expectData as emptyObjectJsonExpectData,
} from './fixtures/empty-object';
import {
  data as emptyArrayJsonData,
  expectData as emptyArrayJsonExpectData,
} from './fixtures/empty-array';
import {
  data as arrayJsonData,
  expectData as arrayJsonExpectData,
} from './fixtures/array';
import {
  data as nestedEmptyArrayJsonData,
  expectData as nestedEmptyArrayJsonExpectData,
} from './fixtures/nested-empty-array';
import {
  data as asymmetricKeysJsonData,
  expectData as asymmetricObjectKeysExpectData,
} from './fixtures/asymmetric-object-keys';

describe('blah', () => {
  it('basic json', () => {
    expect(transform(basicJsonData)).toEqual(expectData);
  });

  it('array object', () => {
    expect(transform(arrayObjectJsonData)).toEqual(arrayObjectJsonExpectData);
  });

  it('nested object', () => {
    expect(transform(nestedObjectJsonData)).toEqual(nestedObjectJsonExpectData);
  });

  it('empty object', () => {
    expect(transform(emptyObjectJsonData)).toEqual(emptyObjectJsonExpectData);
  });

  it('empty array', () => {
    expect(transform(emptyArrayJsonData)).toEqual(emptyArrayJsonExpectData);
  });

  it('array', () => {
    expect(transform(arrayJsonData)).toEqual(arrayJsonExpectData);
  });

  it('nested empty array', () => {
    expect(transform(nestedEmptyArrayJsonData)).toEqual(nestedEmptyArrayJsonExpectData);
  });

  it('asymmetric object keys', () => {
    expect(transform(asymmetricKeysJsonData)).toEqual(asymmetricObjectKeysExpectData);
  });

  it('json string data', () => {
    expect(transform('{"name": "John"}')).toEqual(`{\n  name: string;\n}`);
  });

  it('json string data 2', () => {
    expect(transform('{"name": "John", "books": [1,2,3,4]}')).toEqual(
      `{\n  name: string;\n  books: [\n    number,\n    number,\n    number,\n    number\n  ];\n}`
    );
  });
});

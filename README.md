# json-to-typing

[![NPM version](https://img.shields.io/npm/v/json-to-typing.svg)](https://www.npmjs.com/package/json-to-typing) [![Build Status](https://travis-ci.org/atayahmet/json-to-typing.svg?branch=main)](https://travis-ci.org/atayahmet/json-to-typing) [![Coverage Status](https://coveralls.io/repos/github/atayahmet/json-to-typing/badge.svg?branch=main)](https://coveralls.io/github/atayahmet/json-to-typing?branch=main) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

Transform json data to Typescript type elements. If do not use Typescript and need to cover type of json data, this tool will be helpfuly for you. You can also use in terminal to automate the transfom process as cli command.

## Install

**Npm:**

```sh
$ npm i json-to-typing --save
```

**Yarn:**

```sh
$ yarn add json-to-typing
```

## Examples:

### Basic

```js
import jsonToTyping from 'json-to-typing';

jsonToTyping('{"name": "John", "age": 30, "isActive": true}');
```

Result:

```ts
{
  name: string;
  age: number;
  isActive: boolean;
}
```

### Nested

```json
{
  "name": "John",
  "age": 30,
  "isActive": true,
  "books": ["Book 1", "Book 2", "Book 3"],
  "movies": {
    "genres": ["sci-fi", "comedy", "fantastic"],
    "favorite": "The Lord Of The Rings"
  }
}
```

```js
jsonToTyping(nested);
```

Result:

```ts
{
  name: string;
  age: number;
  isActive: boolean;
  books: [string, string, string];
  movies: {
    genres: [string, string, string];
    favorite: string;
  }
}
```

## CLI

Install Globally

```sh
$ npm i -g json-to-typing
```

```sh
$ json2typing --help
```

Run locally

```sh
$ node_modules/.bin/json2typing --help
```

Run with npx

```sh
$ npx json2typing --help
```

### Examples

**Basic:**

```sh
$ json2typing --source '{"name": "John"}'
```

output:

```ts
{
  name: string;
}
```

**Interface Example:**

```sh
$ json2typing interface IUser --source '{"name": "John"}'
```

output:

```ts
interface IUser {
  name: string;
}
```

> **Note:** You can use `--export` flag to add export keyword.

```sh
$ json2typing interface IUser --source '{"name": "John"}' --export
```

output:

```ts
export interface IUser {
  name: string;
}
```

### Typing types

| Name      |
| :-------- |
| interface |
| declare   |
| type      |

### Flags

| Name     | Description                   |
| :------- | ----------------------------- |
| --source | JSON string or json file path |
| --export | Add export keyword            |
| --help   | Show help menu                |

### Use in CMD Pipeline

```sh
$ echo '{"name": "John"}' | json2typing type Member --export
```

output:

```ts
export type Member {
  name: string;
}
```

Another:

```sh
$ cat ./package.json | json2typing declare Package --export
```

output:

```ts
export declare const Package: {
  version: string;
  license: string;
  main: string;
  typings: string;
  bin: {
    json2typing: string;
  };
  files: [string, string];
  engines: {
    node: string;
  };
  scripts: {
    start: string;
    build: string;
  };
  peerDependencies: {};
  husky: {
    hooks: {
      'pre-commit': string;
      'commit-msg': string;
    };
  };
  prettier: {
    printWidth: number;
    semi: boolean;
    singleQuote: boolean;
    trailingComma: string;
  };
  name: string;
  author: string;
  module: string;
  devDependencies: {
    husky: string;
  };
  dependencies: {};
};
```
## Tests

```sh
$ npm test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
import cliHandler from './../src/cli-handler';
import { expectData } from './fixtures/basic';

describe('blah', () => {
  test('show help menu', done => {
    const mockProcess = {
      argv: ['node', 'index.js', '--help'],
    };
    cliHandler(mockProcess).then((result: unknown) => {
      expect(typeof result).toEqual('string');
      if (typeof result === 'string') {
        expect(result.includes('Usage: json2typing')).toEqual(true);
      }
      done();
    });
  });

  test('parse json string by --source ', (done: CallableFunction) => {
    const mockProcess = {
      argv: ['node', 'index.js', '--source', '{"name": "john"}'],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(`{\n  name: string;\n}`);
      done();
    });
  });

  test('parse json file by --source ', (done: CallableFunction) => {
    const mockProcess = {
      argv: [
        'node',
        'index.js',
        '--source',
        `${process.cwd()}/test/fixtures/basic/data.json`,
      ],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(expectData);
      done();
    });
  });

  test('throw exception when parsing wrong path', done => {
    const mockProcess = {
      argv: ['node', 'index.js', '--source', `./test/data.json`],
    };

    cliHandler(mockProcess)
      .then(() => {
        done();
      })
      .catch(e => {
        expect(/no such file or directory/.test(e.message)).toEqual(true);
        done();
      });
  });

  test('throw exception when parsing invalid json string', done => {
    const mockProcess = {
      argv: ['node', 'index.js', '--source', `{name": "john"}`],
    };

    cliHandler(mockProcess)
      .then(() => {
        done();
      })
      .catch(e => {
        expect(e instanceof SyntaxError).toEqual(true);
        done();
      });
  });

  test('throw exception when passing invalid output type', done => {
    const mockProcess = {
      argv: ['node', 'index.js', 'array', 'Test', '--source', `{"name": "john"}`],
    };

    cliHandler(mockProcess)
      .then(() => {
        done();
      })
      .catch(e => {
        expect(e.message).toEqual('invalid type array');
        done();
      });
  });

  test('generate interface', done => {
    const mockProcess = {
      argv: ['node', 'index.js', 'interface', 'IUser', '--source', `{"name": "john"}`],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(`interface IUser {\n  name: string;\n}`);
      done();
    });
  });

  test('generate exportable interface', done => {
    const mockProcess = {
      argv: [
        'node',
        'index.js',
        'interface',
        'IUser',
        '--source',
        `{"name": "john"}`,
        '--export',
      ],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(`export interface IUser {\n  name: string;\n}`);
      done();
    });
  });

  test('generate type', done => {
    const mockProcess = {
      argv: ['node', 'index.js', 'type', 'User', '--source', `{"name": "john"}`],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(`type User {\n  name: string;\n}`);
      done();
    });
  });

  test('generate exportable type', done => {
    const mockProcess = {
      argv: [
        'node',
        'index.js',
        'type',
        'User',
        '--source',
        `{"name": "john"}`,
        '--export',
      ],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(`export type User {\n  name: string;\n}`);
      done();
    });
  });

  test('generate declare', done => {
    const mockProcess = {
      argv: ['node', 'index.js', 'declare', 'User', '--source', `{"name": "john"}`],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(`declare const User: {\n  name: string;\n}`);
      done();
    });
  });

  test('generate exportable declare', done => {
    const mockProcess = {
      argv: [
        'node',
        'index.js',
        'declare',
        'User',
        '--source',
        `{"name": "john"}`,
        '--export',
      ],
    };

    cliHandler(mockProcess).then(result => {
      expect(result).toEqual(`export declare const User: {\n  name: string;\n}`);
      done();
    });
  });
});

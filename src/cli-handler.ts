import readline from 'readline';
import fs from 'fs';
import transform from './index';

const outputTypes = {
  type: '{type} {name} {data}',
  declare: '{type} const {name}: {data}',
  interface: '{type} {name} {data}',
} as Record<string, string>;

type OutputTypeKeys = 'type' | 'declare' | 'interface';

const getMenu = () => {
  return `
  Usage: json2typing [type] [name] [--export] [--source <data | file/path>]
  
  Help: json2typing --help
  
  Examples:
  - json2typing interface IResult --export
  - json2typing declare Member --export
  - json2typing type User --export
  - json2typing type Role
  `;
};

const reform = (
  type: OutputTypeKeys,
  name: string,
  result: string,
  _process: Record<string, any>
) => {
  let outputType = outputTypes[type];

  [type, name, result].forEach(
    value => (outputType = outputType.replace(/(\{\w+\})/, value))
  );

  const hasExport = _process.argv.slice(2).includes('--export');
  return hasExport ? `export ${outputType}` : outputType;
};

const cli = (_process: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    const { argv } = _process;
    const [, , type, name] = argv;
    const outputType = outputTypes[type];
    const sourceIndex = argv.indexOf('--source');

    if (sourceIndex >= 4 && !outputType) {
      return reject(new Error(`invalid type ${type}`));
    } else if (argv.includes('--help')) {
      return resolve(getMenu());
    } else if (argv.includes('--source')) {
      const sourceDataIndex = sourceIndex + 1;
      const source = argv[sourceDataIndex];
      const isJson = /(\{|\[).*(\}|])/.test(source);
      const data = isJson ? source : fs.readFileSync(source).toLocaleString();
      let result = transform(data);

      if (sourceIndex >= 4)
        result = reform(type as OutputTypeKeys, name, result, _process);
      return resolve(result);
    }

    let buffer = '';
    readline
      .createInterface({
        input: _process.stdin,
        output: _process.stdout,
        terminal: false,
      })
      .on('line', line => (buffer += line))
      .on('close', () => {
        let result = transform(JSON.parse(buffer));
        if (_process.argv.length > 3) {
          result = reform(type as OutputTypeKeys, name, result, _process);
        }
        resolve(result);
      });
  });
};

export default cli;

const fs = require('fs');
const path = require('path');
const FOLDER = path.resolve(__dirname, '../src/app/global/icons');
const JS_RESERVED_VARIABLES = [
  'abstract',
  'arguments',
  'await',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',
];
const DIGITS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
];

const snakeToCamel = str =>
  str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');

const camelToLowerCamel = str => str[0].toLowerCase() + str.substring(1);

const getfiles = () =>
  files.reduce((acc, curr) => {
    const name = curr.split('.')[0];
    return { ...acc, [snakeToCamel(name)]: curr };
  }, {});

const files = fs
  .readdirSync(FOLDER)
  .filter(file => file.split('.').slice(-1)[0] === 'svg');
const imports = [];
const types = [];
const exportMap = [];

files.map(file => {
  let name = file.split('.')[0];
  name = name
    .split('')
    .map(char => {
      const number = parseInt(char);
      if (isNaN(number)) {
        return char;
      }
      return '-' + DIGITS[number] + '-';
    })
    .join('');
  name = snakeToCamel(name);

  if (JS_RESERVED_VARIABLES.indexOf(name) !== -1) {
    name += 'Icon';
  }

  const nameLower = camelToLowerCamel(name);
  imports.push(`import ${name} from './${file}';`);
  types.push(nameLower);
  exportMap.push(`${nameLower}: ${name}`);
});

const outputImports = imports.join('\n');
const outputTypes = `export type IconNamesT =\n | '${types.join("'\n | '")}';`;
const outputExports = `export default {\n  ${exportMap.join(
  ',\n  '
)}\n} as Record<IconNamesT, React.FC<React.SVGProps<SVGSVGElement>>>;`;

const file = 'index.ts';

fs.writeFileSync(
  FOLDER + '/' + file,
  "import React from 'react';\n" +
    outputImports +
    '\n\n' +
    outputTypes +
    '\n\n' +
    outputExports
);

console.log(file + ' written');

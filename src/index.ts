import parse from 'json-to-ast';
import typeDetect from 'type-detect';

type LocNode = {
  line: number;
  column: number;
  offset: number;
};

type Loc = {
  start: LocNode;
  end: LocNode;
  source: string | null;
};

export type ASTNode = {
  type: 'Property' | 'Object' | 'Array' | 'Literal' | 'Identifier';
  key?: ASTNode;
  children?: ASTNode[];
  value?: ASTNode;
  raw?: string;
  loc: Loc;
};

const OPEN_OBJECT = '{';
const CLOSE_OBJECT = '}';
const OPEN_ARRAY = '[';
const CLOSE_ARRAY = ']';
const NEW_LINE = '\n';
const COLON = ':';
const SEMI_COLON = ';';
const COMMA = ',';
const SPACE_SIZE = 2;

const transformer = (
  node: ASTNode,
  buffer: string = '',
  spaceDepth: number = 0,
  isLastNode: boolean = true
) => {
  if (
    (isArray(node) || isProperty(node) || !node.value) &&
    (hasChild(node) || hasChild(node.value))
  ) {
    const { children, type } = node.value || node;

    switch (type) {
      case 'Object': {
        let tokens = [];

        // object tag is opening -> "{"
        if (hasKey(node)) {
          tokens.push(space(spaceDepth), getKey(node.key), COLON, space(1), OPEN_OBJECT);
        } else {
          tokens.push(getKey(node.key));
          if (node.loc.start.column > 1) tokens.push(NEW_LINE);
          tokens.push(space(spaceDepth), OPEN_OBJECT);
        }

        if (children) tokens.push(NEW_LINE);
        buffer += tokens.join('');

        if (children) {
          // children of the object are populating -> "{...}"
          buffer = populate(children, buffer, spaceDepth + SPACE_SIZE);
        }

        tokens = [];
        if (children) tokens.push(space(spaceDepth));

        // object tag is closing -> "}"
        tokens.push(CLOSE_OBJECT);

        if (hasKey(node)) {
          tokens.push(SEMI_COLON, NEW_LINE);
        } else if (!isLastNode) {
          tokens.push(COMMA);
        }
        buffer += tokens.join('');
        break;
      }
      case 'Array': {
        let tokens = [];

        // array tag is opening -> "["
        if (hasKey(node)) {
          tokens = [space(spaceDepth), getKey(node.key), COLON, space(1), OPEN_ARRAY];
        } else {
          tokens = [];
          if (children) tokens.push(NEW_LINE, space(spaceDepth));
          tokens.push(OPEN_ARRAY);
        }
        buffer += tokens.join('');

        if (children) {
          // array children populating -> "[...]"
          buffer = populate(children, buffer, spaceDepth + SPACE_SIZE);
        }

        tokens = [];
        if (children) tokens.push(NEW_LINE, space(spaceDepth));

        // array tag is closing -> "]"
        tokens.push(CLOSE_ARRAY);

        if (hasKey(node)) {
          tokens.push(SEMI_COLON, NEW_LINE);
        }

        buffer += tokens.join('');
        break;
      }
    }
  } else if (isLiteral(node.value) && hasKey(node)) {
    const tokens = [
      space(spaceDepth),
      getKey(node.key),
      COLON,
      space(1),
      typeDetect(node.value?.value),
      SEMI_COLON,
      NEW_LINE,
    ];
    buffer += tokens.join('');
  } else if (isLiteral(node)) {
    const tokens = [NEW_LINE, space(spaceDepth), typeDetect(node.value)];
    if (!isLastNode) tokens.push(COMMA);
    buffer += tokens.join('');
  }

  return buffer;
};

const space = (size: number): string => ' '.repeat(size);

const isProperty = (node?: ASTNode): boolean =>
  node && node.type === 'Property' ? true : false;

const isArray = (node?: ASTNode): boolean =>
  node && node.type === 'Array' ? true : false;

const isLiteral = (node?: ASTNode): boolean =>
  node && node.type === 'Literal' ? true : false;

const hasChild = (node?: ASTNode): boolean => (node && node.children ? true : false);

const hasKey = (node: ASTNode): boolean => (node && node.key ? true : false);

const getValue = (node?: ASTNode): any => node && node.value;

const getKey = (node?: ASTNode): string => {
  const key = getValue(node);
  return /\W+/.test(key) ? `"${key}"` : key;
};

const populate = (children: ASTNode[], buffer: string, spaceDepth: number): string => {
  let index = 0;
  const lastIndex = children.length - 1;
  for (const child of children) {
    const isLastItem = index === lastIndex;
    buffer = transformer(child, buffer, spaceDepth, isLastItem);
    index++;
  }
  return buffer;
};

const transform = (data: string | Record<string, any>) => {
  const ast = (typeof data === 'string'
    ? parse(data)
    : parse(JSON.stringify(data))) as ASTNode;

  return transformer(ast, '', 0).trim();
};

export default transform;

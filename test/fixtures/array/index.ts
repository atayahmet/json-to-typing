import data from './data.json';

const expectData = `[
  number,
  string,
  number,
  string,
  string,
  boolean,
  number,
  {
    title: string;
  },
  [
    {
      name: string;
    },
    {
      name: string;
    }
  ]
]`;

export { data, expectData };

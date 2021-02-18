import data from './data.json';

const expectData = `[
  {
    name: string;
    fullname: string;
    age: number;
    cars: {
      car1: string;
      car2: string;
      car3: string;
    };
  },
  {
    name: string;
    fullname: null;
    age: number;
    cars: {
      car1: string;
      car2: string;
      car3: string;
    };
  }
]`;

export { data, expectData };

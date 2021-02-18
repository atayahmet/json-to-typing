import data from './data.json';

const expectData = `{
  isbn: string;
  author: {
    lastname: string;
    firstname: string;
  };
  editors: [
    {
      id: number;
      lastname: string;
      firstname: string;
      contact: {
        email: string;
        address: {
          country: string;
          city: string;
        };
      };
    },
    {
      id: number;
      lastname: string;
      firstname: string;
      contact: {
        email: string;
        address: {
          country: string;
          city: string;
        };
      };
    }
  ];
  title: string;
  category: [
    string,
    string
  ];
  isPublished: boolean;
}`;

export { data, expectData };

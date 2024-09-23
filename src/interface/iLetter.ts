export interface ILetter {
    id: number;
    number: number;
    about: string;
    date_of_letter: string;
    link:string;
    owner: {
      name: string;
      alias: string;
    };
  }
  
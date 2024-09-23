export interface IWebsite {
  id: number;
  name: string;
  link: string;
  provider: string;
  payment_lastest: string;
  owner: {
    name: string;
    alias: string;
  };
}

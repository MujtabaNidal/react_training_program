import { IAddress } from './IAddress';

export interface IEmployee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: IAddress[];
  }

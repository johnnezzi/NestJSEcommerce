import { Document } from 'mongoose';

interface Address {
  addr1: string;
  addr2: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

export interface User extends Document {
  username: string,
  readonly password: string;
  seller: boolean;
  address: Address;
  created: Date;
}
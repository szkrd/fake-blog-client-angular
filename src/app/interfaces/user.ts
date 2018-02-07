import {Gender} from '../enums/gender.enum';

export interface User {
  id: number;
  isAdmin: boolean;
  name: string;
  username: string;
  email: string;
  gender: Gender;
  dateOfBirth: Date;
  occupation: string;
  avatar: string;
}

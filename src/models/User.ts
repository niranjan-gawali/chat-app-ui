import { AbstractModel } from './AbstractModel';

export interface User extends AbstractModel {
  email: string;
  firstName: string;
  lastName: string;
}

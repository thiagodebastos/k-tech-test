import { IUser } from '../interfaces/user.interface';

export class UserDto implements IUser {
  /**
   * The user's id as stored in the database.
   * When using MongoDB, we convert `_id`
   * to a string and return that
   * @example '66ed6ea85b45f5c838d4d68a'
   */
  readonly id: string;
  /**
   * The user's name
   * @example 'Peter'
   */
  readonly name: string;

  /**
   * The user's email
   * @example 'peter.smith@gmail.com'
   */
  readonly email: string;

  /**
   * The user's phone number
   * @example '0400000000'
   */
  readonly phone: number;
}

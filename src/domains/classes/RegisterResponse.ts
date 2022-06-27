import {IRegisterResponse} from '../interfaces/IRegisterResponse';

export class RegisterResponse implements IRegisterResponse {
  user: string = '';
  accessToken: string = '';
}
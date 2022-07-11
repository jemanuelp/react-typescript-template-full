import {IProfileUser} from './IProfileUser';
import {IChatContact} from './IChatContact';
import {IChats} from './IChats';
import {IUser} from '../../../../domains/interfaces/IUser';

export type InitialStateType = {
  userProfile: IProfileUser,
  contacts: IChatContact[],
  chats: IChats[],
  selectedUser: IUser
}
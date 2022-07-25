import {IProfileUser} from './IProfileUser';
import {IChatContact} from './IChatContact';
import {IChats} from './IChats';

export type InitialStateType = {
  userProfile: IProfileUser,
  contacts: IChatContact[],
  chats: IChats[],
  selectedUser: { chat: IChats, contact: IChatContact }
}
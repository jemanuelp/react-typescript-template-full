import {IUser} from '../interfaces/IUser';
import {AppChatState} from '../../views/apps/chat/store';
import {Dispatch, SetStateAction} from 'react';

export interface ChatProptypes {
    handleUser: Function;
    handleUserSidebarRight: Dispatch<SetStateAction<boolean>>;
    handleSidebar: Dispatch<SetStateAction<boolean>>;
    store: AppChatState;
    userSidebarLeft: boolean;
}
import {IProfileUser} from "../interfaces/IProfileUser";
import {IChatContact} from "../interfaces/chats/IChatContact";
import {IChats} from "../grouper/IChats";
import {IUser} from "../interfaces/IUser";
import {AppChatState} from "../../views/apps/chat/store";
import {Dispatch, SetStateAction} from "react";

export interface SidebarLeftProptypes {
    store: AppChatState;
    sidebar: boolean;
    handleSidebar: Dispatch<SetStateAction<boolean>>;
    userSidebarLeft: boolean;
    handleUserSidebarLeft: Dispatch<SetStateAction<boolean>>;
}
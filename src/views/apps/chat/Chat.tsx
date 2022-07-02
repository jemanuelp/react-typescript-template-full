import ReactDOM from 'react-dom';
import {useState, useEffect, useRef, Dispatch, SetStateAction} from 'react';
import {AppChatState, sendMsg} from './store';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather';
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown,
} from 'reactstrap';
import {IChat} from './interfaces/IChat';
import Avatar from '../../../@core/components/avatar';
import {IChats} from './interfaces/IChats';

export interface ChatProptypes {
  handleUser: Function;
  handleUserSidebarRight: Dispatch<SetStateAction<boolean>>;
  handleSidebar: Dispatch<SetStateAction<boolean>>;
  store: AppChatState;
  userSidebarLeft: boolean;
}

const ChatLog = (props: ChatProptypes) => {
  const {
    handleUser,
    handleUserSidebarRight,
    handleSidebar,
    store,
    userSidebarLeft,
  } = props;
  const { userProfile, selectedUser } = store;
  const chatArea = useRef(null);
  const dispatch = useDispatch<any>();
  const [msg, setMsg] = useState('');

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current);
    if (chatContainer && chatContainer instanceof Element) {
      chatContainer.scrollTop = Number.MAX_SAFE_INTEGER;
    }
  };

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    const selectedUserLen = Object.keys(selectedUser).length;

    if (selectedUserLen) {
      scrollToBottom();
    }
  }, [selectedUser]);

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    const chatLog: IChat[] = [];
    if (selectedUser.chat && selectedUser.chat.length) {
      selectedUser.chat.forEach((chat: IChats) => {
        chat.chat.forEach((msg: IChat) => {
          chatLog.push(msg);
        });
      });
    }

    const formattedChatLog: IChat[] = [];
    let chatMessageSenderId = chatLog[0] ?
      chatLog[0].senderId :
      undefined;
    let msgGroup: IChat = {
      senderId: chatMessageSenderId,
      messages: [],
    };
    chatLog.forEach((msg: any, index: number) => {
      if (chatMessageSenderId === msg.senderId) {
        msgGroup.messages = [];
        msgGroup.messages.push({
          msg: msg.message,
          time: msg.time,
        });
      } else {
        chatMessageSenderId = msg.senderId;
        formattedChatLog.push(msgGroup);
        msgGroup = {
          senderId: msg.senderId,
          messages: [
            {
              msg: msg.message,
              time: msg.time,
            },
          ],
        };
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });
    return formattedChatLog;
  };

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.senderId !== 11,
          })}
        >
          <div className='chat-avatar'>
            <Avatar
              imgWidth={36}
              imgHeight={36}
              className='box-shadow-1 cursor-pointer'
              img={item.senderId === 11 ?
                userProfile.avatar :
                (selectedUser && selectedUser.contact && typeof selectedUser.contact !== 'string') ?
                  selectedUser.contact.avatar :
                  ''}
            />
          </div>
          <div className='chat-body'>
            {item.messages && item.messages.map(chat => (
              <div key={chat.msg} className='chat-content'>
                <p>{chat.msg}</p>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = (obj: any) => {
    handleUserSidebarRight(true);
    handleUser(obj);
  };

  // ** On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (
      !Object.keys(selectedUser).length &&
        !userSidebarLeft && window.innerWidth < 992
    ) {
      handleSidebar(true);
    }
  };

  // ** Sends New Msg
  const handleSendMsg = (e: any) => {
    e.preventDefault();
    if (msg.trim().length) {
      dispatch(sendMsg({ ...selectedUser, message: msg }));
      setMsg('');
    }
  };

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = Object.keys(selectedUser).length && selectedUser.chat ?
    PerfectScrollbar :
    'div';

  return (
    <div className='chat-app-window'>
      <div className={classnames('start-chat-area', { 'd-none': Object.keys(selectedUser).length })}>
        <div className='start-chat-icon mb-1'>
          <MessageSquare />
        </div>
        <h4 className='sidebar-toggle start-chat-text' onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {Object.keys(selectedUser).length ?
        (
          <div className={classnames('active-chat', { 'd-none': selectedUser === null })}>
            <div className='chat-navbar'>
              <header className='chat-header'>
                <div className='d-flex align-items-center'>
                  <div className='sidebar-toggle d-block d-lg-none me-1' onClick={() => {
                    handleSidebar(true);
                  }}>
                    <Menu size={21} />
                  </div>
                  <Avatar
                    imgHeight='36'
                    imgWidth='36'
                    img={
                      (
                        selectedUser &&
                        selectedUser.contact &&
                        typeof selectedUser.contact !== 'string' &&
                        selectedUser.contact.avatar
                      ) ?
                        selectedUser.contact.avatar :
                        ''}
                    status={
                      (selectedUser &&
                        selectedUser.contact &&
                        typeof selectedUser.contact !== 'string' &&
                        selectedUser.contact.status
                      ) ?
                        selectedUser.contact.status :
                        ''}
                    className='avatar-border user-profile-toggle m-0 me-1'
                    onClick={() => handleAvatarClick(selectedUser.contact)}
                  />
                  <h6 className='mb-0'>{
                    (
                      selectedUser &&
                      selectedUser.contact &&
                      selectedUser.contact &&
                      typeof selectedUser.contact === 'string'
                    ) ?
                      selectedUser.contact :
                      ''
                  }</h6>
                </div>
                <div className='d-flex align-items-center'>
                  <PhoneCall size={18} className='cursor-pointer d-sm-block d-none me-1' />
                  <Video size={18} className='cursor-pointer d-sm-block d-none me-1' />
                  <Search size={18} className='cursor-pointer d-sm-block d-none' />
                  <UncontrolledDropdown className='more-options-dropdown'>
                    <DropdownToggle className='btn-icon' color='transparent' size='sm'>
                      <MoreVertical size='18' />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      View Contact
                      </DropdownItem>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Mute Notifications
                      </DropdownItem>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Block Contact
                      </DropdownItem>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Clear Chat
                      </DropdownItem>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Report
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </header>
            </div>

            <ChatWrapper ref={chatArea} className='user-chats' options={{ wheelPropagation: false }}>
              {selectedUser.chat ?
                <div className='chats'>{renderChats()}</div> :
                null}
            </ChatWrapper>

            <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
              <InputGroup className='input-group-merge me-1 form-send-message'>
                <InputGroupText>
                  <Mic className='cursor-pointer' size={14} />
                </InputGroupText>
                <Input
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder='Type your message or use speech to text'
                />
                <InputGroupText>
                  <Label className='attachment-icon mb-0' for='attach-doc'>
                    <Image className='cursor-pointer text-secondary' size={14} />
                    <input type='file' id='attach-doc' hidden />
                  </Label>
                </InputGroupText>
              </InputGroup>
              <Button className='send' color='primary'>
                <Send size={14} className='d-lg-none' />
                <span className='d-none d-lg-block'>Send</span>
              </Button>
            </Form>
          </div>
        ) :
        null}
    </div>
  );
};

export default ChatLog;

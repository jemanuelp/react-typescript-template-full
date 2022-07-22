import {useState, useEffect, FormEvent} from 'react';
import Avatar from '../../../../@core/components/avatar';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {MoreVertical, Send, Image} from 'react-feather';

import {Card, CardHeader, Form, Label, InputGroup, Input, InputGroupText, Button} from 'reactstrap';

import profilePic from '../../../../../src/assets/images/portrait/small/avatar-s-11.jpg';

import '../../../../@core/scss/base/pages/app-chat-list.scss';
import {IChat} from '../../../apps/chat/interfaces/IChat';
import {IChatContact} from '../../../apps/chat/interfaces/IChatContact';
import {IChatContactFather} from '../../../apps/chat/interfaces/IChatContactFather';
import {IChats} from '../../../apps/chat/interfaces/IChats';
import {IMessage} from '../../../apps/chat/interfaces/IMessage';

const data: { chat: IChats, contact: IChatContactFather } = {
  chat: {
    id: 2,
    // userId: 1,
    unseenMsgs: 0,
    chat: [
      {
        message: 'How can we help? We\'re here for you!',
        time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
        senderId: 11,
      },
      {
        message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
        time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
        senderId: 1,
      },
      {
        message: 'It should be Bootstrap 5 compatible.',
        time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
        senderId: 1,
      },
      {message: 'Absolutely!', time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)', senderId: 11},
      {
        message: 'Modern admin is the responsive bootstrap 5 admin template.!',
        time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
        senderId: 11,
      },
      {message: 'Looks clean and fresh UI.', time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)', senderId: 1},
      {
        message: 'It\'s perfect for my next project.',
        time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
        senderId: 1,
      },
      {message: 'How can I purchase it?', time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)', senderId: 1},
      {message: 'Thanks, from ThemeForest.', time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)', senderId: 11},
      {message: 'I will purchase it for sure. 👍', time: '2020-12-08T13:52:38.013Z', senderId: 1},
    ],
  },
  contact: {
    id: 1,
    fullName: 'Felecia Rower',
    avatar: require('../../../../../src/assets/images/portrait/small/avatar-s-20.jpg'),
    status: 'away',
  },
};

const CardChat = () => {
  const [msg, setMsg] = useState('');
  const [chatRef, setChatRef] = useState<HTMLElement | null>(null);
  const [chatData, setChatData] = useState(data);

  //** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog: IChat[] = [];
    if (chatData) {
      chatLog = chatData.chat.chat;
    }

    const formattedChatLog: {
            senderId: number | undefined;
            messages: IMessage[];
        }[] = [];
    let chatMessageSenderId = chatLog[0] ?
      chatLog[0].senderId :
      undefined;
    let msgGroup: any = {
      senderId: chatMessageSenderId,
      messages: [],
    };
    chatLog.forEach((msg, index) => {
      if (chatMessageSenderId === msg.senderId) {
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

  //** Renders user chat
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
              className='box-shadow-1 cursor-pointer'
              img={item.senderId === 11 ?
                profilePic :
                chatData.contact.avatar}
            />
          </div>

          <div className='chat-body'>
            {item.messages.map(chat => (
              <div key={chat.msg} className='chat-content'>
                <p>{chat.msg}</p>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  //** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatRef) {
      chatRef.scrollTop = Number.MAX_SAFE_INTEGER;
    }
  };

  useEffect(() => {
    if (chatRef !== null) {
      scrollToBottom();
    }
  }, [chatRef, chatData.chat.chat.length]);

  const handleSendMsg = (e: FormEvent) => {
    e.preventDefault();
    if (msg.trim().length) {
      const newMsg = chatData;

      newMsg.chat.chat.push({
        message: msg,
        time: new Date(),
        senderId: 11,
      });

      setChatData(newMsg);
      setMsg('');
    }
  };

  return (
    <Card className='chat-widget'>
      <CardHeader>
        <div className='d-flex align-items-center'>
          <Avatar status='online' className='me-2' img={chatData.contact.avatar} imgHeight='34'
            imgWidth='34'/>
          <h5 className='mb-0'>Carrie Hawkins</h5>
        </div>
        <MoreVertical size={18} className='cursor-pointer'/>
      </CardHeader>
      <div className='chat-app-window'>
        <PerfectScrollbar
          containerRef={el => setChatRef(el)}
          className='user-chats scroll-area'
          options={{wheelPropagation: false}}
        >
          <div className='chats'>{renderChats()}</div>
        </PerfectScrollbar>
        <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
          <InputGroup className='input-group-merge me-1 form-send-message'>
            <InputGroupText>
              <Label className='attachment-icon mb-0' for='attach-doc'>
                <Image className='cursor-pointer text-secondary' size={14}/>
                <input type='file' id='attach-doc' hidden/>
              </Label>
            </InputGroupText>
            <Input
              value={msg}
              className='border-0'
              onChange={e => setMsg(e.target.value)}
              placeholder='Type your message'
            />
          </InputGroup>
          <Button className='send' color='primary'>
            <Send size={14} className='d-lg-none'/>
            <span className='d-none d-lg-block'>Send</span>
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default CardChat;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';
import Message from './Message';

function MessageBody() {
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(true);
  const [messageRef, setMessageRef] = useState({})
  const chatRoom = useSelector(state=>state.chatRoom.currentChatRoom);
  const user = useSelector(state=>state.user.currentUser);
  
  const addMessagesListeners = (ref, chatRoomId) => {
    ref
      .child(chatRoomId)
      .on("child_added", snapshot => {  
        setMessages(prev=>[...prev, snapshot.val()]);
        setMessageLoading(false);
      });
  }

  useEffect(() => {
    const ref = firebase.database().ref("meesages");
    setMessageRef(ref);
  }, [])

  useEffect(() => {
    
    if(chatRoom) {
      addMessagesListeners(messageRef, chatRoom.id);
    }
    return () => {
    }
  }, [chatRoom, messageRef])

  const renderMessages = messages =>
    messages.length > 0 && 
    messages.map(message=>(
      <div>
        <Message 
          key={message.timestamp}
          message={message}
          user={user}
        />
      </div>
    ));

  return (    
      <div style={{
        width: '100%',
        height: '350px',
        border: '.2rem solid #ececec',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '1rem',
        overflowY: 'auto'
      }}>
        {renderMessages(messages)}
      </div>
    
  )
}

export default MessageBody

import React, { useEffect, useState, useCallback } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import firebase from '../../../firebase';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentChatRoom, setPrivateChatRoom} from '../../../redux/actions/chatRoom_action';

function DirectMessages() {

  const user = useSelector(state=>state.user.currentUser);
  const isPrivateChatRoom = useSelector(state=>state.chatRoom.isPrivateChatRoom);
  const dispatch = useDispatch();

  const [usersRef, setUsersRef] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeChatRoomId, setActiveChatRoomId] = useState('');

  const getChatRoomId = useCallback(userId => {
    return userId < user.uid ? 
      `${userId}/${user.uid}`:`${user.uid}/${userId}`;
  },[user]);

  const changeChatRoom = useCallback(user => {
    const chatRoomId = getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.displayName
    }
    dispatch(setCurrentChatRoom(chatRoomData));
    dispatch(setPrivateChatRoom(true));
    setActiveChatRoomId(user.uid);
  }, [dispatch, getChatRoomId]);

  useEffect(() => {
    if(!usersRef) setUsersRef(firebase.database().ref("users"));
    return () => {
      if(usersRef) usersRef.off("child_added");
    }
  }, [usersRef]);

  const addUsersListeners = useCallback(
    (currentUserUid) => {
      if(usersRef) {
        usersRef.on("child_added", snapshot=>{
          if(currentUserUid !== snapshot.key) {
            const newUser = snapshot.val();
            newUser['uid'] = snapshot.key;
            newUser['status'] = "offline";
            setUsers(prev=>[...prev, newUser]);
          }
        })
      }
    },
    [usersRef],
  );

  

  useEffect(() => {
    if(user) {
      addUsersListeners(user.uid);
    }
    return () => {
      setUsers([]);
    }
  }, [user, addUsersListeners]);

  const renderDirectMessages = (users) => 
    users.length > 0 &&
    users.map(u=>
      (<li 
        key={u.uid}
        onClick={()=>changeChatRoom(u)}
        style={{ backgroundColor: isPrivateChatRoom && u.uid === activeChatRoomId && "#ffffff45"}}
      >
        # {u.displayName}
      </li>)
  );


  return (
    <div>
      <span style={{ display: 'flex', alignItems:'center'}}>
        <FaRegSmile style={{ marginRight: 3}} /> Direct Messages(1)
      </span>
      <ul style={{ listStyleType: 'none', padding: 0}}>
        {renderDirectMessages(users)}
      </ul>
    </div>
  )
}

export default DirectMessages
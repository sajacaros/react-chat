import React, { useEffect, useState, useCallback } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import firebase from '../../../firebase';
import {useSelector} from 'react-redux';

function DirectMessages() {

  const usersRef = firebase.database().ref("users");
  const user = useSelector(state=>state.user.currentUser);
  const [users, setUsers] = useState([]);

  const addUsersListeners = useCallback(
    (currentUserUid) => {
      usersRef.on("child_added", snapshot=>{
        if(currentUserUid !== snapshot.key) {
          console.log('direct_chat added');
          const newUser = snapshot.val();
          newUser['uid'] = snapshot.key;
          newUser['status'] = "offline";
          setUsers(prev=>[...prev, newUser]);
        }
      })
    },
    [usersRef],
  );


  useEffect(() => {
    if(user) {
      console.log('addUsersListeners, user : ', user.uid);
      addUsersListeners(user.uid);
    }
    return () => {
      setUsers([]);
      usersRef.off("child_added");
      
    }
  }, [user, usersRef, addUsersListeners]);

  const renderDirectMessages = () => {
    users.length > 0 &&
    users.map(u=>(
      <li key={u.uid}># {u.name}</li>
    ));
  }


  return (
    <div>
      <span style={{ display: 'flex', alignItems:'center'}}>
        <FaRegSmile style={{ marginRight: 3}} /> Direct Messages(1)
      </span>
      <ul style={{ listStyleType: 'none', padding: 0}}>
        {renderDirectMessages()}
      </ul>
    </div>
  )
}

export default DirectMessages
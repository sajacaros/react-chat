import React from 'react'
import {IoIosChatboxes} from 'react-icons/io';
import DropDown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image'
import {useSelector} from 'react-redux';
import firebase from '../../../firebase'

function UserPanel() {
  const user = useSelector(state=>state.user.currentUser);
  const handleLogout = ()=> {
    firebase.auth().signOut();
  }

  if (user === null) {
    return <p>Loading profile...</p>;
  } else {  
    return (
      <div>
        <h3 style={{color: 'white'}}>
          <IoIosChatboxes />
          ChatApp
        </h3>
        <div style={{display: 'flex', marginBottom: '1rem'}}>
          <Image src={user.photoURL} 
          style={{widht:'30px', height: '30px', marginTom: '3px'}}
          roundedCircle />
          <DropDown>
            <DropDown.Toggle 
              style={{background: 'transparent', border:'0px'}} 
              id="dropdown-basic">
              {user.displayName}
            </DropDown.Toggle>
            <DropDown.Menu>
              <DropDown.Item href="#/action-1">
                프로필 사진 변경
              </DropDown.Item>
              <DropDown.Item onClick={handleLogout}>
                로그아웃
              </DropDown.Item>
            </DropDown.Menu>
          </DropDown>
        </div>
      </div>
    )
  }
}

export default UserPanel
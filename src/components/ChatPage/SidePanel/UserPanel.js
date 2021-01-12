import React, {useRef} from 'react'
import {IoIosChatboxes} from 'react-icons/io';
import DropDown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image'
import {useDispatch, useSelector} from 'react-redux';
import firebase from '../../../firebase';
import mime from 'mime-types';
import {setPhotoURL} from '../../../redux/actions/user_action';

function UserPanel() {
  const user = useSelector(state=>state.user.currentUser);
  // console.log(user);
  const inputOpenImageRef = useRef();
  const dispatch = useDispatch();

  const handleLogout = ()=> {
    firebase.auth().signOut();
  }
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if(!file) return ;

    const metadata = {contentType: mime.lookup(file.name)};
    try {
      const uploadTaskSnapshot = await firebase.storage().ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata);
      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
      console.log("url : ", downloadURL);
      await firebase.auth().currentUser.updateProfile({photoURL:downloadURL});
      dispatch(setPhotoURL(downloadURL));
      await firebase.database().ref("users")
        .child(user.uid)
        .update({image:downloadURL});
    } catch(error) {
      console.error('Failed to upload snapshot, error : ',error);
    }
  }

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
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
              {user?user.displayName:'-'}
            </DropDown.Toggle>
            <DropDown.Menu>
              <DropDown.Item onClick={handleOpenImageRef}>
                프로필 사진 변경
              </DropDown.Item>
              <DropDown.Item onClick={handleLogout}>
                로그아웃
              </DropDown.Item>
            </DropDown.Menu>
          </DropDown>
        </div>
        <input
          type="file"
          accept="image/jpeg, image/png"
          style={{display: 'none'}}
          ref={inputOpenImageRef}
          onChange={handleUploadImage}
        />
      </div>
    )
  }
}

export default UserPanel
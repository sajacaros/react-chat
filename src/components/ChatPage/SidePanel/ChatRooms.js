import React, {useState, useEffect} from 'react';
import { FaRegSmileWink, FaPlus} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from '../../../firebase';
import {useSelector} from 'react-redux';

function ChatRooms() {
  const defaultRoomInfo = {
    name: "",
    description: ""
  }

  const [show, setShow] = useState(false);
  const [roomInfo, setRoomInfo] = useState(defaultRoomInfo);
  const [chatRoomRef, setChatRoomRef] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector(state=>state.user.currentUser);
  // const chatRoomRef = firebase.database().ref("chatRooms");

  useEffect(() => {
    setChatRoomRef(firebase.database().ref("chatRooms"));
  }, [chatRoomRef]);

  const addChatRoom = async () => {
    if(!chatRoomRef){
      return
    }
    const key = chatRoomRef.push().key;
    const newChatRoom = {
      id: key,
      name: roomInfo.name,
      description: roomInfo.description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL
      }
    }
    try {
      await chatRoomRef.child(key).update(newChatRoom);
    } catch(err) {
      alert(err);
    }
    setRoomInfo(defaultRoomInfo);
    setShow(false);
  }

  const isFormValid = (name, description) => name && description

  const onModalButtonClick = () => {
    if(isFormValid(roomInfo.name, roomInfo.description)) {
      addChatRoom();
    }
  }


  return (
    <div>
      <div style={{
        position:'relative', width:'100%',
        display:'flex', alignItems:'center'
      }}>
        <FaRegSmileWink style={{marginRight: 3}} />
        CHAT ROOMS (1)
        <FaPlus style={{
          position: 'absolute', 
          right:0, cursor: 'pointer'
        }} 
        onClick={handleShow}
        />
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoomName">
              <Form.Label>방 이름</Form.Label>
              <Form.Control 
                onChange={e=>setRoomInfo(prev=>({...prev, name:e.target.value}))} 
                name="roomName" type="text" placeholder="Enter a chat room name" />
            </Form.Group>

            <Form.Group controlId="formRoomDescription">
              <Form.Label>방 설명</Form.Label>
              <Form.Control 
                onChange={e=>setRoomInfo(prev=>({...prev, description:e.target.value}))} 
                name="roomDescription" type="text" placeholder="Enter a chat room description" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={onModalButtonClick}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ChatRooms
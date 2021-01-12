import React, {useState, useEffect, useCallback} from 'react';
import { FaRegSmileWink, FaPlus, FaAddressCard} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from '../../../firebase';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentChatRoom} from '../../../redux/actions/chatRoom_action';

function ChatRooms() {
  const defaultRoomInfo = {
    name: "",
    description: ""
  }

  const [show, setShow] = useState(false);
  const [roomInfo, setRoomInfo] = useState(defaultRoomInfo);
  const [chatRoomRef, setChatRoomRef] = useState({});
  const [chatRooms, setChatRooms] = useState([]);
  const [neededInit, setNeededInit] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();

  const changeChatRoom = useCallback(room => dispatch(setCurrentChatRoom(room)), [dispatch]);
  // const changeChatRoom = room => dispatch(setCurrentChatRoom(room));

  useEffect(() => {
    const roomRef = firebase.database().ref("chatRooms");
    setChatRoomRef(roomRef);
    
    roomRef.on("child_added", snapshot=> {
      console.log('child added, snapshot : ', snapshot.val())
      setChatRooms(prev=>[...prev, snapshot.val()]);
    })
    return () => {
  
    }
  }, [changeChatRoom]);

  useEffect(()=>{
    if(neededInit && chatRooms.length > 0) {
      changeChatRoom(chatRooms[0]);
      console.log('selected initial chatRoom, room : ', chatRooms[0]);
      setNeededInit(false);
    }
  }, [chatRooms, changeChatRoom, neededInit]);

  const addChatRoom = async () => {
    if(!chatRoomRef){
      alert('firebase ref is not initialized');
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

  

  const renderChatRooms = chatRooms => {
    if(chatRooms.length) 
      return chatRooms.map(room=>(
        <li 
          key={room.id}
          onClick={()=>changeChatRoom(room)}
        >
          # {room.name}
        </li>
      ));
  }

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
      <ul style={{ listStyleType:'none', padding: 0}}>
        {renderChatRooms(chatRooms)}
      </ul>

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
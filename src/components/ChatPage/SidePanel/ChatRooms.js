import React, {useState} from 'react';
import { FaRegSmileWink, FaPlus} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

function ChatRooms() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>방 이름</Form.Label>
              <Form.Control type="text" placeholder="Enter a chat room name" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>방 설명</Form.Label>
              <Form.Control type="text" placeholder="Enter a chat room description" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ChatRooms
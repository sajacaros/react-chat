import React, {useState,useEffect} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar';
import firebase from '../../../firebase';
import {useSelector} from 'react-redux';

function MessageForm() {
  const currentChatRoom = useSelector(state=>state.chatRoom.currentChatRoom);
  const user = useSelector(state=>state.user.currentUser);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [messageRef, setMessageRef] = useState({});

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL
      }
    };
    if (fileUrl !== null) {
      message['image'] = fileUrl;
    } else {
      message['content'] = content;
    }
    return message;
  };

  useEffect(() => {
    const messageRef = firebase.database().ref("messages");
    setMessageRef(messageRef);
  }, [])

  const handleSubmit = async () => {
    setLoading(true);
    if(!content) {
      setLoading(false);
      return;
    }
    
    try {
      await messageRef
        .child(currentChatRoom.id)
        .push()
        .set(createMessage());
      setErrors([]);
      setContent('');
      setLoading(false);
    } catch(error) {
      console.error(error);
      setErrors(prev=> prev.concat(error));
      setLoading(false);
      setTimeout(()=> {
        setErrors([])
      }, 5000);
    }
  }

  const handleChange = (e) => {
    setContent(e.target.value);
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control 
            as="textarea" 
            rows={2} 
            value={content}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <ProgressBar variant="warning" label="60%" now={60} />
      <div>
        {
          errors.map(errorMsg=>
            <p style={{color:'red'}} key={errorMsg}>
              {errorMsg}
            </p>
          )
        }
      </div>

      <Row>
        <Col>
          <button 
            className="message-form-button"
            style={{width:'100%'}}
            onClick={handleSubmit}
            disabled={loading}
          >
            Send
          </button>
        </Col>
        <Col>
        <button 
            className="message-form-button"
            style={{width:'100%'}}
            disabled={loading}
          >
            Upload
          </button>
        </Col>
      </Row>
    </div>
  )
}

export default MessageForm

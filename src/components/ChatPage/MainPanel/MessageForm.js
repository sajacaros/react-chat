import React, {useState,useEffect, useRef} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar';
import firebase from '../../../firebase';
import {useSelector} from 'react-redux';
import mime from 'mime-types';

function MessageForm() {
  const currentChatRoom = useSelector(state=>state.chatRoom.currentChatRoom);
  const user = useSelector(state=>state.user.currentUser);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [messageRef, setMessageRef] = useState({});
  const inputOpenImageRef = useRef()
  const [percentage, setPercentage] = useState(0);
  const [storageRef, setStorageRef] = useState({});

  const handleOpenImage = () => {
    inputOpenImageRef.current.click()
  }

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if(!file) return;
    setLoading(true);
    const filePath = `message/public/${file.name}`;
    const metadata = {contentType: mime.lookup(file.name)};
    const uploadTask = storageRef.child(filePath).put(file, metadata);

    try {
      console.log('upload, filePath : ', filePath);
      await uploadTask
        .on("state_changed", uploadTaskSnapshot=>{
          const percentage = Math.round(
            (uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes)*100
          );
          setPercentage(percentage);
        },
        err=>{
          console.error(err);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          messageRef.child(currentChatRoom.id).push().set(createMessage(downloadURL))
        });
      console.log('uploaded');
    } catch(err) {
      alert(err);
    }finally{
      setLoading(false);
    }

  }

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

  useEffect(() => {
    const storageRef = firebase.storage().ref();
    setStorageRef(storageRef);
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
      console.log('message input submit!!, content : ', content);
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
      {
        !(percentage===0 || percentage===100) &&
        <ProgressBar variant="warning" label={`${percentage}`} now={percentage} />
      }
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
            onClick={handleOpenImage}
          >
            Upload
          </button>
        </Col>
      </Row>
      <input accept="image/jpeg, image/png" style={{display:'none'}} type="file" ref={inputOpenImageRef} onChange={handleUploadImage} />
    </div>
  )
}

export default MessageForm

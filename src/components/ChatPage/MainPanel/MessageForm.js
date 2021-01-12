import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

function MessageForm() {
  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={2} />
        </Form.Group>
      </Form>
      <ProgressBar variant="warning" label="60%" now={60} />
      <Row>
        <Col>
          <button 
            className="message-form-button"
            style={{width:'100%'}}
          >
            Send
          </button>
        </Col>
        <Col>
        <button 
            className="message-form-button"
            style={{width:'100%'}}
          >
            Upload
          </button>
        </Col>
      </Row>
    </div>
  )
}

export default MessageForm

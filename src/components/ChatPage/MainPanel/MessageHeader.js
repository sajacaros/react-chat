import React from 'react'
import { Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap'
import { FaLock, FaUnlock } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux';


function MessageHeader({handleSearchChange}) {
  const currentChatRoom = useSelector(state=>state.chatRoom.currentChatRoom);
  const user = useSelector(state=>state.user.currentUser);
  const isPrivateChatRoom = useSelector(state=>state.chatRoom.isPrivateChatRoom);

  return (
    <div style={{
      width: '100%',
      height: '170px',
      border: '.2rem solid #ececec',
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <Container>
        <Row>
          <Col>{isPrivateChatRoom?<FaLock />:<FaUnlock />} {currentChatRoom? currentChatRoom.name:'-'} <MdFavorite /></Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <AiOutlineSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search Messages"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <div style={{ display:'flex', justifyContent: 'flex-end'}}>
          <p>
            <Image src={user? user.photoURL: ''} style={{width:'25px', height:'25px'}}/>{" "}{user?user.displayName:''}
          </p>
        </div>
        <Row>
          <Col>
            <Accordion>
              <Card>
                <Card.Header style={{padding: '0 1rem'}}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col>
            <Accordion>
              <Card>
                <Card.Header style={{padding: '0 1rem'}}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MessageHeader

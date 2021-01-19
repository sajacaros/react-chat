import React from 'react';
import Media from 'react-bootstrap/Media';
import moment from 'moment';

function Message({message, user}) {
  const timeFromNow = timestamp=>moment(timestamp).fromNow();
  const isImage = message => {
    return message.hasOwnProperty("image");
  }
  return (
    <Media>
      <img 
        style={{borderRadius: '10px', margin: '5px 1px 1px 1px'}}
        width={40}
        height={40}
        className="mr-3"
        src={message.user.image}
        alt={message.user.name}
      />
      <Media.Body>
        <h6>
          {message.user.name}
          <span style={{fontSize: '10px', color:'gray', margin: '0px 0px 5px 5px'}}>{timeFromNow(message.timestamp)}</span>
        </h6>
        {isImage(message)?
          <img style={{masWidth:'200px'}} alt="이미지" src={message.image} />
          :
          <p>{message.content}</p>
        }
      </Media.Body>
    </Media>
  );
}

export default Message

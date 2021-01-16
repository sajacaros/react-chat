import React from 'react'

function Message(props) {
  console.log(props)
  return (
    <div>
      {props.message.content}
    </div>
  )
}

export default Message

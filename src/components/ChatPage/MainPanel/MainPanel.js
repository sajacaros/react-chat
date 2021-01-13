import React from 'react'
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'
import MessageBody from './MessageBody'


function MainPanel() {
  return (
    <div style={{
      padding: '1rem 2rem 0 2rem'
    }}>
      <MessageHeader />
      <MessageBody />
      <MessageForm />
    </div>
  )
}

export default MainPanel

import React, {useState} from 'react'
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'
import MessageBody from './MessageBody'


function MainPanel() {
  const [searchTerm, setSearchTerm] =  useState("");
  const [searchLoading, setSearchLoading] =  useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchLoading(true);
  }

  return (
    <div style={{
      padding: '1rem 2rem 0 2rem'
    }}>
      <MessageHeader handleSearchChange={handleSearchChange}/>
      <MessageBody searchTerm={searchTerm} />
      <MessageForm />
    </div>
  )
}

export default MainPanel

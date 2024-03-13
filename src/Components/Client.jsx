import React from 'react'
import Avatar from 'react-avatar'

function Client({username}) {
  return (
    <div className="mt-4 flex items-center ml-4">
      <Avatar
        name={username}
        size="30"
        round="50%"
        className="mr-2"
      />
      <span className="text-gray-200">{username}</span>
    </div>
  )
}

export default Client

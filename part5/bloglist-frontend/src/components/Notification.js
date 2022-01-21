import React from 'react'

const Notification = ({ message, error }) => {
  const style = error
    ? {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    : {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
  if (message === null) return null
  else
    return (
      <div style={style} className="error">
        {message}
      </div>
    )
}

export default Notification

import React from 'react';

const Suggestions = (props) => {
  const options = props.results.map(username => (
    <li key={username}>
      {username}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions;
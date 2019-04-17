import React from 'react';
import PropTypes from 'prop-types';

const Suggestions = ({results, click}) => {

  const options = results.map(({id, username}) => (
    <div key={id}>
      <a href="0" data-id={id} key={id} onClick={click}>
        {username}
      </a>
    </div>
  ))
  console.log(options, 'options')
  return <div>{options}</div>
}

Suggestions.propTypes = {
  results: PropTypes.array,
  click: PropTypes.func
}

export default Suggestions;
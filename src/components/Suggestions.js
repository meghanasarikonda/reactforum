import React from 'react';
import PropTypes from 'prop-types';

const Suggestions = ({results, click}) => {

  const options = results.map(({id, username}) => (
    <div key={id} aria-label="selectUsername">
      <a 
        href="0" 
        role="button"
        aria-labelledby="selectUsername"
        data-id={id} 
        key={id} 
        onClick={click}
      >
        {username}
      </a>
    </div>
  ))
  
  return <div>{options}</div>
}

Suggestions.propTypes = {
  results: PropTypes.array,
  click: PropTypes.func.isRequired
}

export default Suggestions;
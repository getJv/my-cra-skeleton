import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1>404 Not Found</h1>
      <ul>
        <li>
          <Link to="/"> Go to Home</Link>
        </li>
      </ul>
    </>
  );
};

export default NotFound;

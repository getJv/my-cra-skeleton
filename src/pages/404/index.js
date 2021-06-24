import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push('/');
  };
  return (
    <div data-testid="not-found-page">
      <h1>404 Not Found</h1>
      <ul>
        <li>
          <div data-testid="go-to-home" aria-hidden="true" onClick={goToHome}>
            Go to Home
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NotFound;

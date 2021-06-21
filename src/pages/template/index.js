import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../../routes';
import { useAuthenticationStore } from '../../store/auth';

function Template() {
  const { doLogin, doLogout } = useAuthenticationStore(store => store.actions);

  return (
    <>
      <header>
        <button type="button" onClick={doLogin}>
          Login
        </button>

        <button type="button" onClick={doLogout}>
          Logout
        </button>
      </header>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default Template;

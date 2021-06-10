import React from 'react';
import ReactDOM from 'react-dom';
import './pages/assets/index.css';
import Template from './pages/template';

if (process.env.NODE_ENV === "development") {
    // You can't use import in a conditional so we're using require() so no
    // Mirage JS code will ever reach your production build.
    require('./miragejs/server').makeServer();
}


ReactDOM.render(<Template />,
  document.getElementById('root')
);



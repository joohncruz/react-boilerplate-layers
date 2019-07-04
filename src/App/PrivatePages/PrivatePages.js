import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import './PrivatePages.scss';

function PrivatePages({
  component: Component, logged, menu, loadLogout, ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => (logged ? (
        <div className="private-pages">
          <h1>Private Pages</h1> <button onClick={loadLogout}> Sair </button>
          <div className="private-pages-content">
            <Component {...props} />
          </div>
        </div>
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      ))}
    />
  );
}

export default PrivatePages;
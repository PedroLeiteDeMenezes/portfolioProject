import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = false; // Aqui você pode conectar à lógica de autenticação.

  if (isClosed && !isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: '/login',
          state: { prevPath: rest.location?.pathname },
        }}
      />
    );
  }

  return <Route {...rest} element={<Component />} />;
}

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isClosed: PropTypes.bool,
};

import React from 'react';

import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const PatientPrivateRoute: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  if (user) {
    return (
      <ReactDOMRoute
        {...rest}
        render={({ location }) => {
          return isPrivate && user.type.name === 'Paciente' ? (
            <Component />
          ) : (
            <Redirect to={{ pathname: isPrivate ? '/doctor/profile' : '/' }} />
          );
        }}
      />
    );
  }

  return <Redirect to={{ pathname: '/' }} />;
};

export default PatientPrivateRoute;

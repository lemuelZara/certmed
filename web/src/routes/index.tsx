import React from 'react';
import { Switch } from 'react-router-dom';

import SigIn from '../pages/SigIn';
import DoctorDashboard from '../pages/Doctor/Dashboard';
import PatientDashboard from '../pages/Patient/Dashboard';
import Appointment from '../pages/Doctor/Appointment';
import DoctorPrivateRoute from './DoctorPrivateRoute';
import PatientPrivateRoute from './PatientPrivateRoute';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SigIn} />

    <DoctorPrivateRoute
      path="/doctor/profile"
      component={DoctorDashboard}
      isPrivate
    />
    <DoctorPrivateRoute
      path="/doctor/appointment"
      component={Appointment}
      isPrivate
    />
    <PatientPrivateRoute
      path="/patient/profile"
      component={PatientDashboard}
      isPrivate
    />
  </Switch>
);

export default Routes;

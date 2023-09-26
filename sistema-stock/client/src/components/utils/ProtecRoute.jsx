import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ canActivate, redirectPath = '/' }) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  canActivate: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;

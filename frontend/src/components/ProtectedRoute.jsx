import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../recoil/selectors';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const isAuth = useRecoilValue(isAuthenticated);
    return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
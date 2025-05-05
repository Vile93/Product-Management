import { FC, ReactElement } from 'react';
import { RouteProps } from './route';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setLocation } from '../../store/reducers/location.reducer';

interface RoutesProps {
    children: ReactElement<RouteProps>[];
    notFoundComponent: ReactElement;
    allRoutes: string[];
    authDefaultRoute?: string;
    unauthDefaultRoute?: string;
}

const Routes: FC<RoutesProps> = ({ children, notFoundComponent, allRoutes, authDefaultRoute, unauthDefaultRoute }) => {
    const { isAuth } = useSelector((state: RootState) => state.auth);
    const location = useSelector((state: RootState) => state.location.location);
    const dispatch = useDispatch();

    if (authDefaultRoute && unauthDefaultRoute && location === '/') {
        if (isAuth) {
            dispatch(setLocation(authDefaultRoute));
        } else {
            dispatch(setLocation(unauthDefaultRoute));
        }
    }
    if (!allRoutes.includes(location)) {
        return notFoundComponent;
    }
    return <>{children}</>;
};

export default Routes;

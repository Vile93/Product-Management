import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export interface RouteProps {
    path: string;
    component: ReactNode;
}

const Route: FC<RouteProps> = ({ path, component }) => {
    const location = useSelector((state: RootState) => state.location.location);

    if (location === path) {
        return component;
    }
    return <></>;
};

export default Route;

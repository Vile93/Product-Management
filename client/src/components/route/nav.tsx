import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setLocation } from '../../store/reducers/location.reducer';

interface NavProps {
    path: string;
    children: React.ReactNode;
}

const Nav: FC<NavProps> = ({ path, children }) => {
    const location = useSelector((state: RootState) => state.location.location);
    const dispatch = useDispatch();

    return (
        <div
            className={`text-xl cursor-pointer ${location === path ? 'font-bold' : ''} text-blue-500`}
            onClick={() => dispatch(setLocation(path))}
        >
            {children}
        </div>
    );
};

export default Nav;

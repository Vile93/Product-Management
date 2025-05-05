import { FC } from 'react';
import Nav from '../components/route/nav';
import { ROUTE_PATH } from '../constants/route.constant';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Toast from '../components/toast';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const { isAuth } = useSelector((state: RootState) => state.auth);

    return (
        <div className="container mx-auto px-4">
            <Toast />
            <header className="py-2">
                <div className="flex gap-4 justify-between items-center">
                    <div className="text-xl sm:text-2xl font-bold">Product Management</div>
                    <div className="flex gap-4">
                        {!isAuth ? (
                            <>
                                <Nav path={ROUTE_PATH.REGISTER}>Register</Nav>
                                <Nav path={ROUTE_PATH.LOGIN}>Login</Nav>
                            </>
                        ) : (
                            <>
                                <Nav path={ROUTE_PATH.PRODUCTS}>Products</Nav>
                                <Nav path={ROUTE_PATH.STATISTICS}>Statistics</Nav>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;

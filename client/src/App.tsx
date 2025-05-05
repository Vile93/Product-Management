import Route from './components/route/route';
import Routes from './components/route/routes';
import Loginpage from './pages/login/login-page';
import Registerpage from './pages/register/register-page';
import ProductsPage from './pages/products/products-page';
import NotFoundPage from './pages/not-found/not-found-page';
import { ROUTE_PATH } from './constants/route.constant';
import MainLayout from './layouts/main-layout';
import StatisticsPage from './pages/statistics/statistics-page';

function App() {
    return (
        <MainLayout>
            <Routes
                notFoundComponent={<NotFoundPage />}
                allRoutes={Object.values(ROUTE_PATH)}
                authDefaultRoute={ROUTE_PATH.PRODUCTS}
                unauthDefaultRoute={ROUTE_PATH.LOGIN}
            >
                <Route path={ROUTE_PATH.PRODUCTS} component={<ProductsPage />} />
                <Route path={ROUTE_PATH.STATISTICS} component={<StatisticsPage />} />
                <Route path={ROUTE_PATH.LOGIN} component={<Loginpage />} />
                <Route path={ROUTE_PATH.REGISTER} component={<Registerpage />} />
            </Routes>
        </MainLayout>
    );
}

export default App;

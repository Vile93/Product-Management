import ErrorForm from '../../components/error-form';
import { useAuth } from '../../hooks/use-auth.hook';
import { login } from '../../api/auth.api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { ROUTE_PATH } from '../../constants/route.constant';
import { setLocation } from '../../store/reducers/location.reducer';

const Loginpage = () => {
    const { error, handleSubmit } = useAuth({ authFn: login });
    const { isAuth } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    if (isAuth) {
        dispatch(setLocation(ROUTE_PATH.PRODUCTS));
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-20">
                <div className="bg-gray-100 p-8 rounded-lg ">
                    <div className="text-2xl font-bold">Authorization</div>
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-5 w-48 sm:w-96">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                Your login
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="login"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Ivan"
                                required
                            />
                            <ErrorForm error={error?.login} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Your password
                            </label>
                            <input
                                name="password"
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                            <ErrorForm error={error?.password} />
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                        <ErrorForm error={error?.message} />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Loginpage;

import Nav from '../../components/route/nav';

const NotFoundPage = () => {
    return (
        <div className="text-center mt-20">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Nav path={'/'}>Go back home</Nav>
            </div>
        </div>
    );
};

export default NotFoundPage;

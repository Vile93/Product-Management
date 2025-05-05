import { FC } from 'react';

interface ErrorFormProps {
    error?: string;
}

const ErrorForm: FC<ErrorFormProps> = ({ error }) => {
    if (!error) return <></>;
    return <div className="mt-2 text-red-500">{error}</div>;
};

export default ErrorForm;

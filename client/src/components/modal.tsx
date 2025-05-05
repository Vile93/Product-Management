import { FC } from 'react';

interface IModalProps {
    title: string;
    content: React.ReactNode;
    acceptButtonText: string;
    declineButtonText: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    otherButtons?: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Modal: FC<IModalProps> = ({
    title,
    content,
    acceptButtonText,
    declineButtonText,
    isOpen,
    setIsOpen,
    otherButtons,
    onSubmit,
}) => {
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div
                className={`${isOpen ? 'block' : 'hidden'} w-full h-full fixed top-0 left-0 bg-black opacity-50 z-10`}
                onClick={handleClose}
            ></div>
            <div className="absolute top-1/8 left-1/2 -translate-x-1/2 z-20">
                <form onSubmit={onSubmit}>
                    <div
                        className={`${
                            isOpen ? 'block' : 'hidden'
                        } overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                    >
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5 space-y-4">{content}</div>
                                <div className="flex items-center gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b">
                                    <button
                                        type="submit"
                                        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        {acceptButtonText}
                                    </button>
                                    {otherButtons ? otherButtons : null}
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="cursor-pointer py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                    >
                                        {declineButtonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Modal;

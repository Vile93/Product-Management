import { FC } from 'react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const ActivePage = ({ page }: { page: number }) => {
    return (
        <li>
            <div className="cursor-pointer flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
                {page}
            </div>
        </li>
    );
};

const UnactivePage = ({
    page,
    onPageChange,
    totalPages,
}: {
    page: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}) => {
    if (page < 1 || page > totalPages) return <></>;
    return (
        <li>
            <div
                className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => onPageChange(page)}
            >
                {page}
            </div>
        </li>
    );
};

const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <>
            <nav className="user-select-none">
                <ul className="inline-flex -space-x-px text-sm">
                    {currentPage !== 1 ? (
                        <li>
                            <div
                                className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                onClick={() => onPageChange(currentPage - 1)}
                            >
                                Previous
                            </div>
                        </li>
                    ) : null}
                    {currentPage < 3 ? (
                        <>
                            {Array.from({ length: 5 }, (_, index) =>
                                index + 1 === currentPage ? (
                                    <ActivePage page={index + 1} key={index} />
                                ) : (
                                    <UnactivePage
                                        key={index}
                                        page={index + 1}
                                        onPageChange={onPageChange}
                                        totalPages={totalPages}
                                    />
                                )
                            )}
                        </>
                    ) : null}
                    {currentPage >= 3 ? (
                        <>
                            <UnactivePage page={currentPage - 2} onPageChange={onPageChange} totalPages={totalPages} />
                            <UnactivePage page={currentPage - 1} onPageChange={onPageChange} totalPages={totalPages} />
                            <ActivePage page={currentPage} />
                            <UnactivePage page={currentPage + 1} onPageChange={onPageChange} totalPages={totalPages} />
                            <UnactivePage page={currentPage + 2} onPageChange={onPageChange} totalPages={totalPages} />
                        </>
                    ) : null}

                    {currentPage !== totalPages ? (
                        <li>
                            <div
                                className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                                onClick={() => onPageChange(currentPage + 1)}
                            >
                                Next
                            </div>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;

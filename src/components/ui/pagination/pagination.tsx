import { useLayoutEffect, useState } from "react";

import s from "./pagination.module.scss";
import { ArrowForward } from "../assets/icons/ArrowForward";
import { ArrowBack } from "../assets/icons/ArrowBack";
import { Link } from "react-router-dom";

type Props = {
    totalCount?: number;
    currentPage: number;
    pageSize: number;
};

export const Pagination = (props: Props) => {
    const { totalCount = 100, pageSize } = props;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(totalCount / +pageSize);

    useLayoutEffect(() => {
        setCurrentPage(+props.currentPage);
    }, [props.currentPage]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > 5) {
            if (currentPage <= 4) {
                endPage = 5;
            } else if (currentPage >= totalPages - 3) {
                startPage = totalPages - 4;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li
                    className={i === currentPage ? s.active : ""}
                    key={i}
                    onClick={() => handlePageChange(i)}>
                    <Link
                        className={s.link}
                        to={"/" + i}>
                        {i}
                    </Link>
                </li>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(
                <li
                    key={"1"}
                    onClick={() => handlePageChange(1)}>
                    <Link
                        className={s.link}
                        to={"/1"}>
                        1
                    </Link>
                </li>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(
                <li
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}>
                    <Link
                        className={s.link}
                        to={`/${totalPages}`}>
                        {totalPages}
                    </Link>
                </li>
            );
        }

        if (startPage > 1) {
            pageNumbers.splice(1, 0, <li key={"collapse1"}>...</li>);
        }

        if (endPage < totalPages) {
            pageNumbers.splice(pageNumbers.length - 1, 0, <li key={"collapse2"}>...</li>);
        }

        return pageNumbers;
    };
    return (
        <div className={s.pagination}>
            <ul>
                <li onClick={() => handlePageChange(currentPage - 1)}>
                    <Link
                        className={s.link}
                        to={`/${currentPage > 1 ? currentPage - 1 : currentPage}`}>
                        <ArrowBack
                            fill={`${currentPage === 1 ? "var(--color-dark-100)" : "white"}`}
                        />
                    </Link>
                </li>
                {renderPageNumbers()}
                <li onClick={() => handlePageChange(currentPage + 1)}>
                    <Link
                        className={s.link}
                        to={`/${currentPage + 1}`}>
                        <ArrowForward
                            fill={`${
                                currentPage === totalPages ? "var(--color-dark-100)" : "white"
                            }`}
                        />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

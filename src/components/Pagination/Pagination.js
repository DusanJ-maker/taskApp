import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Pagination.module.css";


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className={styles.paginationFlex}>
            {pageNumbers.map(number => (
                <li key={number}>
                    <Link onClick={() => paginate(number)}>
                        {number}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
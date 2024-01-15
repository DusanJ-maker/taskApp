import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {

    const { name, id } = useSelector((state) => state.user);
    // console.log(name)

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const onLogoutClickHandler = e => {
        e.stopPropagation();
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className={styles.mainDiv}>
            <nav className={styles.nav}>
                <ul className={styles.headerMain}>
                    <li><Link to="/products">Home</Link></li>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

                        {!token && <>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </>}


                        {token &&
                            <>
                                <span key="username">Name: {name}</span>
                                <span key="userId">ID: {id}</span>
                                <button key="logout" onClick={onLogoutClickHandler}>Log out</button>
                            </>}
                    </div>
                </ul>
            </nav>
        </div >
    )
}

export default Header
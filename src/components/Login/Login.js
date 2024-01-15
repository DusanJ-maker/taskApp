import React, { useState } from "react";
import styles from "./Login.module.css";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { update } from "../../appRedux/userSlice";

const Login = () => {

    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    //navigate
    const navigate = useNavigate();

    //dispatch
    const dispatch = useDispatch();

    // const token = localStorage.getItem("token");

    // if (token) {
    //     navigate('/products');
    // }

    const handleInput = (e) => {
        // console.log(e.target.value);

        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post("https://junior-test.mntzdevs.com/api/login/", {
                username,
                password
            })
            .then(res => {
                // console.log(res.data.jwt);
                const decodedToken = jwtDecode(res.data.jwt);

                // console.log(decodedToken);


                localStorage.setItem("token", res.data.jwt);

                dispatch(update({ username: decodedToken.username, id: decodedToken.id }))

                navigate('/products');

            })
            .catch(err => console.error(err))
    }

    const { username, password } = input;
    // console.log(input)

    return (
        <>
            <div className={styles.centralDiv}>
                <div className={styles.container}>
                    <h2 className={styles.title}>Login</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            className={styles.input}
                            onChange={handleInput}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            className={styles.input}
                            onChange={handleInput}
                        />
                        <button type="submit" className={styles.buttonLogin}>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login
import React, { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeatPassword: "",
        subscribeToNewsLetter: false,
        gender: "male",
        status: "active",
        yearOfBirth: 0,
    })

    const navigate = useNavigate();

    const { username, password, repeatPassword, subscribeToNewsLetter, gender, status, yearOfBirth } = formData

    const onChange = (e) => {
        console.log(e.target);
        if (e.target.name === "subscribeToNewsLetter") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value === "false" ? true : false
            }));
        }
        else if (e.target.name === "yearOfBirth") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: Number(e.target.value)
            }));
        }
        else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post("https://junior-test.mntzdevs.com/api/register/", {
                username,
                password,
                repeatPassword,
                subscribeToNewsLetter,
                gender,
                status,
                yearOfBirth: Number(yearOfBirth)
            })
            .then(res => { console.log(res); navigate('/login') })
            .catch(err => console.error(err))

        // console.log(formData)
    }

    // console.log(formData);
    return (
        <>
            <div className={styles.centralDiv}>
                <div className={styles.container}>
                    <h2 className={styles.title}>Register</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            className={styles.input}
                            value={username}
                            onChange={onChange}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            value={password}
                            onChange={onChange}
                        />
                        <label htmlFor="username">Repeat password</label>
                        <input
                            type="password"
                            name="repeatPassword"
                            className={styles.input}
                            value={repeatPassword}
                            onChange={onChange}
                        />
                        <label htmlFor="username">Subscribe To News Letter</label>
                        <input
                            type="checkbox"
                            name="subscribeToNewsLetter"
                            value={subscribeToNewsLetter}
                            onChange={onChange}
                        />
                        <section>
                            <p>Choose a gender</p>
                            <label htmlFor="username">Male</label>
                            <input type="radio" name="gender" value="male" defaultChecked={gender}
                                onChange={onChange} />
                            <label htmlFor="username">Female</label>
                            <input type="radio" name="gender" value="female"
                                onChange={onChange} />
                            <label htmlFor="username">Other</label>
                            <input type="radio" name="gender" value="other"
                                onChange={onChange} />
                        </section>
                        <label htmlFor="status">Choose a status:</label>

                        <select id="status" name="status" onChange={onChange}>
                            {/* <option value="active" defaultChecked={status} onChange={onChange}>active</option>
                            <option value="inactive" onChange={onChange}>inactive</option> */}
                            <option value="active" defaultChecked={status} >active</option>
                            <option value="inactive">inactive</option>
                        </select>
                        <label htmlFor="quantity">Year of birth (between 1965 and 2005):</label>
                        <input type="number" id="quantity" name="yearOfBirth" value={yearOfBirth} onChange={onChange} min="1965" max="2005" />
                        <button type="submit" className={styles.buttonRegister}>Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register
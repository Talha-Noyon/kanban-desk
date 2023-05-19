import React, { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { OuterLogin, InnerLogin } from "./LoginStyle";
import axios from '../../axios/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [user, setUser] = useState({
        user_email: "",
        user_pass: ""
    });
    const [loader, setLoader] = useState(false);
    const login = async (e) => {
        e.preventDefault();
        setLoader(true);
        const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regx.test(user.user_email)) {
            //const path = "https://rnd.idesk360.com";
            //const path = "https://app.idesk360.com";
            const path = "http://localhost:80";
            const url = `${path}/api/wall_dashboard_login`;
            console.log("user", user)
            await axios.post(url, user)
                .then(({ data }) => {
                    localStorage.setItem("user", JSON.stringify({ wd_token: data._id, user_id: data.user_id }));
                    toast.success("Log in successfull!");
                    setLoader(false);
                    window.location.replace("/dashboard")
                })
                .catch(({ response }) => {
                    setLoader(false);
                    console.log("error", e);
                    toast.error(response.data);
                })
        } else {
            toast.error("Please enter a valid email address!");
            setLoader(false);
        }
    }
    return (
        <OuterLogin>
            <InnerLogin>
                <h1 className='text-primary text-center mb-4'>Login</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='text-white'>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email address"
                            onChange={(e) => { setUser({ ...user, user_email: e.target.value }) }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='text-white'>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => { setUser({ ...user, user_pass: e.target.value }) }}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <button disabled={loader} onClick={login} className='btn btn-light' type="submit">
                        Submit {
                            loader &&
                            <Spinner size="sm" animation="grow" variant="dark" />
                        }
                    </button>
                </Form>
            </InnerLogin>
        </OuterLogin>
    )
}

export default Login
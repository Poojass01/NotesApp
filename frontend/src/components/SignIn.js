import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { signIn } from '../api';
import { Link } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signIn({ user_email: email, password });
            dispatch(login(data));
            alert('Login successful');
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <div className="signin-page">
        <div className="signin-container">
            <div className="signin-box">
            <h1 className="signin-heading">Welcome to NotesApp</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
                <p className="signin-footer">
                    Don't have an account? <Link to="/signup" className="signin-link">Sign Up</Link>
                </p>
            </div>
        </div>
        </div>
    );
};

export default SignIn;

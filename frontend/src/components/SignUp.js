import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await signUp({ user_name: userName, user_email: email, password });
            alert('Sign up successful! Please sign in.');
            navigate('/signin');
        } catch (error) {
            alert('Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="signup-page">
        <div className="signup-container">
            <div className="signup-box">
            <h1 className="signup-heading">Welcome to NotesApp</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-input"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p className="signup-footer">
                    Already have an account? <Link to="/signin" className="signup-link">Sign In</Link>
                </p>
            </div>
        </div>
        </div>
    );
};

export default SignUp;

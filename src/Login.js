import React, { useState } from "react";
import { auth } from "./firebase"; 

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    confirmPasswordError,
  } = props;


  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetError, setResetError] = useState(null);

  const handleForgetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(resetEmail);
      setResetEmailSent(true);
      setResetError(null);
    } catch (error) {
      setResetError(
        "Error sending reset email. Please check your email and try again."
      );
    }
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Email / Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        {!hasAccount && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="errorMsg">{confirmPasswordError}</p>
          </>
        )}
        {hasAccount ? (
          <>
            <button className="link-button" onClick={handleLogin}>
              Sign in
            </button>
            <br></br>
            <p>
              Don't have an account?{" "}
              <span
                className="link"
                onClick={() => setHasAccount(!hasAccount)}
                style={{ cursor: "pointer" }} 
              >
                Sign up
              </span>
            </p>
            <br></br>
            <p>
              <span
                className="link"
                onClick={() => setResetEmailSent(true)}
                style={{ cursor: "pointer" }} 
              >
                Forgot Password
              </span>
            </p>
          </>
        ) : (
          <>
            <button className="link-button" onClick={handleSignup}>
              Sign up
            </button>
           
            <p>
              Have an account?{" "}
              <span
                className="link"
                onClick={() => setHasAccount(!hasAccount)}
                style={{ cursor: "pointer" }} 
              >
                Sign in
              </span>
            </p>
          </>
        )}
        {hasAccount && !resetEmailSent && (
          <>
            <p>Enter your email to reset your password:</p>
            <input
              type="email"
              placeholder="Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button
              className="link-button"
              onClick={handleForgetPassword}
              style={{ cursor: "pointer" }} 
            >
              Send Reset Email
            </button>
            {resetError && <p className="errorMsg">{resetError}</p>}
          </>
        )}
        {resetEmailSent && (
          <p>Check your email for a password reset link.</p>
        )}
      </div>
    </section>
  );
};

export default Login;

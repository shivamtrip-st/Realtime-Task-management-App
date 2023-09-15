/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import Users from './pages/User';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { auth } from './firebase'; // Import auth from your Firebase config file
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { lazy, Suspense } from 'react';



function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }
  const LazyComponent = lazy(() => import('../src/pages/AddEdit'));
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
          case 'auth/user-disabled':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleSignup = () => {
    clearErrors();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {user ? (
          <>
        
  
            <Header />
            <ToastContainer position='top-center' />
            <Routes>
       
              <Route path="/" element={<Home handleLogout={handleLogout} />} />
              <Route path="/" element={<Home/>}/>
             
              <Route path="/add" element={<AddEdit />} />
              <Route path="/update/:id" element={<AddEdit />} />
              <Route path="/view/:id" element={<View />} />
              <Route path="/User" element={<Users />} />
            </Routes>
          </>
        ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

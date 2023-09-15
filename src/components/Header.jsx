 import React, {useEffect, useState} from 'react'
 import {Link, useLocation} from 'react-router-dom'
 import "./Header.css"



 const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const location = useLocation();
    
    useEffect(() => {
        if(location.pathname === '/') {
            setActiveTab('Home');
        } else if(location.pathname === '/add') {
            setActiveTab('AddContact');
        } else if(location.pathname === '/User') {
            setActiveTab('User');
        }
    } , [location])


   return (
     <div className='header'>
        <p className='logo'>Real Time Task Manager</p>
        <div className='header-right'>
            <Link to='/'>
            
                <p 
                    className={`${activeTab === 'Home' ? 'active' : ''}`} 
                   
                    onClick={() => setActiveTab("Home")}>
                    Home
                </p>
             
            </Link>
            <Link to='/add'>
                <p 
                    className={`${activeTab === 'AddContact' ? 'active' : ''}`} 
                    onClick={() => setActiveTab("AddContact")}>
                    Add Task
                </p>
            </Link>
            <Link to='/User'>
                <p 
                    className={`${activeTab === 'User' ? 'active' : ''}`} 
                    onClick={() => setActiveTab("User")}>
                    Users
                </p>
            </Link>
            
        </div>
     </div>
   )
 }
 const Header1 = React.memo(Header);
 export default Header1;
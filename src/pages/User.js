import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; 
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); 
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        
        setCurrentUser(user);

        
        db.collection('contacts')
          .where('assignee', '==', user.uid) 
          .onSnapshot((snapshot) => {
            
            setTasks(userTasks);
console.log('Tasks:', userTasks);
            const userTasks = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTasks(userTasks);
          });
      } else {
      
        navigate('/login');
      }
    });

    return () => unsubscribe();


  }, []);

  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{ marginTop: '150px', textAlign: 'center' }}>
      <h2>User Profile</h2>
      {currentUser && <p>Welcome, {currentUser.email}</p>}
      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>Task Name:</strong> {task.name}
            <br />
            <strong>Description:</strong> {task.email}
            <br />
            <strong>Link:</strong> {task.contact}
          </li>
        ))}
      </ul>
      <br />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};
const User1 = React.memo(User);
export default User1;

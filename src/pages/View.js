import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { realtimeDb } from '../firebase';
import './View.css';

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const contactRef = ref(realtimeDb, `contacts/${id}`);
    get(contactRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      })
      .catch((error) => {
        console.error('Error getting data:', error);
      });
  }, [id]);

  return (
    <div style={{ marginTop: '150px' }}>
      <div className="card">
        <div className="card-header">
          <p>Task Details</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Task: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Description: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Link: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <strong>comments: </strong>
          <span>{user.comments}</span>
          <br />
          <br />
          <strong>Assignee: </strong>
          <span>{user.assignee}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const View1 = React.memo(View);
export default View1;

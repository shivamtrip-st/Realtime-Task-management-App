import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import { ref, get, remove } from 'firebase/database'; 
import { auth, realtimeDb } from '../firebase'; 



const Home = ({ handleLogout }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const contactsRef = ref(realtimeDb, "contacts"); 
    get(contactsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error('Error getting data:', error);
      });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure that the task is completed?")) {
      const contactRef = ref(realtimeDb, `contacts/${id}`); 
      remove(contactRef)
        .then(() => {
          toast.success("Task completed successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <section className="hero">
      <nav></nav>

      <div style={{ marginTop: "100px", marginBottom: "100px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Task</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Link</th>
              <th style={{ textAlign: "center" }}>comment</th>
              <th style={{ textAlign: "center" }}>Assigned To user</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].comments}</td>
                  <td>{data[id].assignee}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Complete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};
const Home1 = React.memo(Home);
export default Home1;

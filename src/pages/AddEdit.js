import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { ref, push, set, get } from 'firebase/database'; // Import the 'get' function here
import { auth, realtimeDb } from '../firebase'; // Import your Firebase configuration

// ...


const initialState = {
  name: "",
  email: "",
  contact: "",
  comment:"",
  assignee:""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const contactsRef = ref(realtimeDb, "contacts"); // Use realtimeDb to access the Realtime Database
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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.contact) {
      toast.error("Please fill in all fields");
    } else {
      if (!id) {
        const newContactRef = push(ref(realtimeDb, "contacts"), state); // Push new contact data
        if (newContactRef) {
          toast.success("Task added successfully");
        } else {
          toast.error("Error adding task");
        }
      } else {
        const contactRef = ref(realtimeDb, `contacts/${id}`);
        set(contactRef, state)
          .then(() => {
            toast.success("Task updated successfully");
          })
          .catch((error) => {
            toast.error("Error updating task: " + error.message);
          });
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div className='form' style={{ marginTop: "100px" }}>

      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
              <h1>ADD Task</h1>
        <label htmlFor="name">Task</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your task"
          value={state.name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Description</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your Description"
          value={state.email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Link</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Enter your link"
          value={state.contact || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="comments">Comment</label>
        <input
          type="text"
          id="comments"
          name="comments"
          placeholder="Comment on task"
          value={state.comments || ""}
          onChange={handleInputChange}
        />
         <label htmlFor="Assignee">Assigned To User</label>
        <input
          type="text"
          id="assignee"
          name="assignee"
          placeholder="task Assigned by "
          value={id}
          onChange={handleInputChange}
        />

        <input type='submit' value={id ? "Update" : "Save"} />
      </form>
     
       

    </div>
  );
};
const AddEdit1 = React.memo(AddEdit);
export default AddEdit;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, push, get, child,set } from 'firebase/database';
import { realtimeDb, auth } from '../firebase';

const TaskComments = ({ taskId }) => { 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const currentUser = auth.currentUser;
  const { id } = useParams();

  useEffect(() => {
    const commentsRef = ref(realtimeDb, `comments/${id}/${taskId}`);
    console.log("hello");

    get(commentsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setComments(Object.values(snapshot.val()));
        } else {
          setComments([]);
        }
      })
      .catch((error) => {
        console.error('Error getting comments:', error);
      });
  }, [id, taskId]);

  const handleAddComment = () => {
    if (newComment) {
      const commentRef = push(ref(realtimeDb, `comments/${id}/${taskId}`), {
        text: newComment,
        user: currentUser.uid,
      });
      if (commentRef) {
        setNewComment('');
      }
    }
  };

  const handleAssignTask = () => {
    if (assignedUser) {
      // Save the assigned user to the task in the database
      const taskRef = ref(realtimeDb, `contacts/${currentUser.uid}/${taskId}`);
      set(taskRef, { ...taskRef, assignedTo: assignedUser })
        .then(() => {
          console.log('Task assigned successfully');
        })
        .catch((error) => {
          console.error('Error assigning task:', error);
        });
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>

      <h2>Assign Task</h2>
      <input
        type="text"
        placeholder="Assign to user (user UID)"
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
      />
      <button onClick={handleAssignTask}>Assign Task</button>
    </div>
  );
};
const TaskComments1 = React.memo(TaskComments);
export default TaskComments1;

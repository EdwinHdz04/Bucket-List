import React, { useState } from 'react';
import BucketForm from './BucketForm';

function Bucket(props) {
  // Initialize state for the item being edited
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  // Toggle the completed state of an item when it is clicked
  const completeBucketItem = (id) => {
    const updatedBucket = props.bucket.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    props.setBucket(updatedBucket);
  };

  // Remove an item from the list when the delete icon is clicked
  const removeBucketItem = (id) => {
    const updatedBucket = props.bucket.filter((item) => item.id !== id);
    props.setBucket(updatedBucket);
  };

  // Update an item in the list when the edit form is submitted
  const submitUpdate = (value) => {
    const updatedBucket = props.bucket.map((item) => {
      if (item.id === edit.id) {
        item.value = value.value;
        item.eagerness = value.eagerness;
      }
      return item;
    });
    props.setBucket(updatedBucket);

    // Clear the edit state after the item is updated
    setEdit({
      id: null,
      value: '',
      eagerness: '',
    });
  };

  return (
    <>
      {edit.id && <BucketForm edit={edit} onSubmit={submitUpdate} />}
      {props.bucket.map((item, index) => (
        <div
          className={`bucket-row ${item.eagerness} ${item.completed ? 'complete' : ''}`}
          key={index}
        >
          {/* Clicking on the item toggles its completed state */}
          <div key={item.id} onClick={() => completeBucketItem(item.id)}>
            {item.value}
          </div>
          <div className="icons">
            {/* Clicking on the edit icon sets the edit state */}
            <p
              onClick={() =>
                setEdit({
                  id: item.id,
                  value: item.value,
                  eagerness: item.eagerness,
                })
              }
            >
              {' '}
              ✏️
            </p>
            {/* Clicking on the delete icon removes the item from the list */}
            <p onClick={() => removeBucketItem(item.id)}> 🗑️</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Bucket;





















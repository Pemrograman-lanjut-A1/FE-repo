import React, { useState } from 'react';
import { createAnnouncementPost } from './create-announcement-post';

const CreateAnnouncementPage = () => {
  const [announcementText, setAnnouncementText] = useState('');

  const handleChange = (event) => {
    setAnnouncementText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Call the function to make the POST request
      await createAnnouncementPost(announcementText);
      // Clear the text field after successful post
      setAnnouncementText('');
    } catch (error) {
      // Handle error if needed
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <div>
      <h2>Create Announcement</h2>
      <textarea
        value={announcementText}
        onChange={handleChange}
        placeholder="Type your announcement here..."
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateAnnouncementPage;

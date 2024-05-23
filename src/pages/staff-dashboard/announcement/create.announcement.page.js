import React, { useState } from 'react';
import { createAnnouncementPost } from './create-announcement-post';
import Navbar from '../../../navbar';

const CreateAnnouncementPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleChangeTag = (event) => {
    setTag(event.target.value);
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedTag = tag.trim();

    if (trimmedContent === '') {
      setErrorMessage('Content cannot be empty');
      return;
    }

    const announcementData = {
      title: trimmedTitle || null,
      content: trimmedContent,
      tag: trimmedTag || null,
    };

    try {
      await createAnnouncementPost(announcementData);
      setSuccessMessage('Announcement created successfully');
      // Clear the fields after successful post
      setTitle('');
      setContent('');
      setTag('');
    } catch (error) {
      setErrorMessage('Error creating announcement');
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Create Announcement</h2>
      <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <input
          type="text"
          value={title}
          onChange={handleChangeTitle}
          placeholder="Title"
          style={{ display: 'block', marginBottom: '10px', width: '300px' }}
        />
        <textarea
          value={content}
          onChange={handleChangeContent}
          placeholder="Type your announcement content here..."
          rows={10}
          cols={50}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={tag}
          onChange={handleChangeTag}
          placeholder="Tag"
          style={{ display: 'block', marginBottom: '10px', width: '300px' }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CreateAnnouncementPage;

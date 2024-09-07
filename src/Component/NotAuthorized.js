import React from 'react';
import LockIcon from '@mui/icons-material/Lock';

const NotAuthorized = () => {
  return (
    <div className="not-authorized-container">
      <LockIcon className="not-authorized-icon" />
      <h1 className="not-authorized-header">403 - Not Authorized</h1>
      <p className="not-authorized-message">
        You do not have permission to view this page.
      </p>
      <a href="/login" className="not-authorized-button">
        Go to login
      </a>
      <p className="contact-support-link" onClick={() => alert('Number : 0937532212')}>
        Contact Support
      </p>
    </div>
  );
};

export default NotAuthorized;

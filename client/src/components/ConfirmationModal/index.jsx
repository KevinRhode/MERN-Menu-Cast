import React from "react";
import ReactMarkdown from 'react-markdown';
import "./confirmationModal.css";

// Props are expanded to include onConfirm and children for custom message rendering
const ConfirmationModal = ({ title, children, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title || 'Informational'}</h2>     
        {children ? (
          <ReactMarkdown>{children}</ReactMarkdown>
        ) : (
          <p>No content provided.</p>
        )}       
        <div>
          <button onClick={onClose}>Cancel</button>
          {onConfirm && <button onClick={onConfirm}>Confirm</button>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

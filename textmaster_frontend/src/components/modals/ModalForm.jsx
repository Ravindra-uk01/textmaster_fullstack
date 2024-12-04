import React from "react";
import "./modalForm.css";

const ModalForm = ({ visible, onClose,onSubmit, title = "Confirmation", confirmText = "Confirm", cancelText = "Nevermind", children }) => {
  if (!visible) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(); 
    onClose(); 
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-button" onClick={onClose}>
          X
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
          <div className="modal-body">
            {children} {/* Render dynamic content here */}
          </div>
          <div className="threadModal_button">
            <button type="button" onClick={onClose}>
              {cancelText}
            </button>
            <button type="submit">{confirmText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;

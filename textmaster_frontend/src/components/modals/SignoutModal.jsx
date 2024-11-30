import React from "react";
import "./threadModal.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../reducers/userReducer";

const SignoutModal = ({ visible, onClose }) => {
  if (!visible) return null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toastData = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('came here buddy ')
    dispatch(removeUser());
    //   window.setTimeout(() => {
    //     navigate('/home');
    //   }, 1500);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-button" onClick={onClose}>
          X
        </div>

        <form onSubmit={handleSubmit} className="threadModal_form">
          <div className="signout_content">
            <h5>Are you sure you want to sign out?</h5>
          </div>

          <div className="threadModal_button">
            <button type="button" onClick={onClose}>
              Nevermind
            </button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignoutModal;

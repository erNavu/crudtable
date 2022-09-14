import React from "react";
import "./modal.css";

const Modal = ({
  formData,
  updateModalState,
  show,
  type,
  handleAddFormSubmit,
  handleEditFormSubmit,
  handleAddFormChange,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div id="myModal" className="modal" onClick={updateModalState}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-header">
          <span className="close" onClick={updateModalState}>
            &times;
          </span>
          <h2>
            {" "}
            {type === "add"
              ? "Add New User"
              : type === "view"
              ? "User data "
              : "Update user data "}
          </h2>
        </div>
        {type === "view" ? (
          <div className="view_div">{JSON.stringify(formData)}</div>
        ) : (
          <div className="modal-body">
            <form
              onSubmit={
                type === "add" ? handleAddFormSubmit : handleEditFormSubmit
              }
            >
              <input
                type="text"
                name="name"
                className="formInput"
                value={formData.name}
                required="required"
                placeholder="Enter a name..."
                onChange={handleAddFormChange}
              />

              <input
                type="text"
                name="username"
                className="formInput"
                value={formData.username}
                required="required"
                placeholder="Enter a username..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="website"
                className="formInput"
                value={formData.website}
                required="required"
                placeholder="Enter a website..."
                onChange={handleAddFormChange}
              />
              <input
                type="email"
                name="email"
                className="formInput"
                value={formData.email}
                required="required"
                placeholder="Enter an email..."
                onChange={handleAddFormChange}
              />
              <div className="submit_btn_container">
                <input
                  type="submit"
                  value={type === "add" ? "Add" : "Update"}
                ></input>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

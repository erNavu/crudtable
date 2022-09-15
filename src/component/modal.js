import React from "react";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../redux/slice/user";
import { nanoid } from "@reduxjs/toolkit";
import { CREATE_USER, UPDATE_USER_BY_ID } from "../redux/types";

const Modal = ({ updateModalState, show, type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    dispatch(setUserSlice({ ...user, [fieldName]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    user.id === 0
      ? dispatch({ type: CREATE_USER, user: { ...user, id: nanoid(4) } })
      : dispatch({ type: UPDATE_USER_BY_ID, user });

    dispatch(
      setUserSlice({
        id: 0,
        name: "",
        username: "",
        website: "",
        email: "",
      })
    );
    updateModalState();
  };
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
          <div className="view_div">
            {console.log(user)}
            {JSON.stringify(user)}
          </div>
        ) : (
          <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="name"
                className="formInput"
                value={user.name}
                required="required"
                placeholder="Enter a name..."
                onChange={handleChange}
              />

              <input
                type="text"
                name="username"
                className="formInput"
                value={user.username}
                required="required"
                placeholder="Enter a username..."
                onChange={handleChange}
              />
              <input
                type="text"
                name="website"
                className="formInput"
                value={user.website}
                required="required"
                placeholder="Enter a website..."
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="formInput"
                value={user.email}
                required="required"
                placeholder="Enter an email..."
                onChange={handleChange}
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

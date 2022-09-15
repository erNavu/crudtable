import React, { useEffect, useState } from "react";
import "../App.css";
import Modal from "./modal";
import { DELETE_USER_BY_ID, GET_USERS } from "../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../redux/slice/user";

const Table = () => {
  const [modalState, updateModalState] = useState(false);
  const [modalType, updateModalType] = useState("add");
  const [searchValue, setSearchValue] = useState("");

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  /**
   * fetching data from dummy api
   */
  useEffect(() => {
    dispatch({ type: GET_USERS });
  }, []);

  /**
   * toggleModal function
   * function to show and hide modal
   */
  const toggleModal = () => {
    updateModalState(!modalState);
  };

  /**
   * handleSearch
   * @param {*} e
   * function to perform search on change of input value
   */
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setSearchValue(value);
  };

  const filteredList = users.filter(
    (el) =>
      el.name.toLowerCase().includes(searchValue) ||
      el.username.toLowerCase().includes(searchValue) ||
      el.website.toLowerCase().includes(searchValue) ||
      el.email.toLowerCase().includes(searchValue)
  );

  return (
    <div className="app_container">
      <h1 className="heading">EMPLOYEES LIST</h1>
      <div className="add_user_container">
        <input
          className="add_btn"
          id="modalBtn"
          type="button"
          value="ADD EMPLOYEE"
          onClick={() => {
            toggleModal();
            updateModalType("add");
          }}
        />
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Search...."
          value={searchValue}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <Modal
        show={modalState}
        type={modalType}
        updateModalState={toggleModal}
      />
      <table>
        <tr>
          <th>Name </th>
          <th>Username </th>
          <th>Website</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        <tbody>
          {filteredList?.length
            ? filteredList?.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.username}</td>
                  <td>{d.website}</td>
                  <td>{d.email}</td>
                  <td>
                    <input
                      type="button"
                      value="UPDATE"
                      className="simpleButton"
                      onClick={() => {
                        toggleModal();
                        updateModalType("update");
                        dispatch(setUserSlice(d));
                      }}
                    />
                    <input
                      type="button"
                      value="DELETE"
                      className="deleteBtn"
                      onClick={() =>
                        dispatch({ type: DELETE_USER_BY_ID, id: d.id })
                      }
                    />
                    <input
                      type="button"
                      value="VIEW"
                      className="simpleButton"
                      onClick={() => {
                        toggleModal();
                        updateModalType("view");
                        dispatch(setUserSlice(d));
                      }}
                    />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

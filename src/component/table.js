import React, { useEffect, useState } from "react";
import "../App.css";
import Modal from "./modal";
const Table = () => {
  const [data, setData] = useState([]);
  const [modalState, updateModalState] = useState(false);
  const [modalType, updateModalType] = useState("add");
  const [searchValue, setSearchValue] = useState("");
  const [showList, updateShowList] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    username: "",
    website: "",
    email: "",
  });

  /**
   * fetching data from dummy api
   */
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        updateShowList(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
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
    let res = [];
    res = data.filter(
      (el) =>
        el.name.toLowerCase().includes(value) ||
        el.username.toLowerCase().includes(value) ||
        el.website.toLowerCase().includes(value) ||
        el.email.toLowerCase().includes(value)
    );
    updateShowList(res);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newData = {
      id: addFormData.name + 1,
      name: addFormData.name,
      username: addFormData.username,
      website: addFormData.website,
      email: addFormData.email,
    };

    const userData = [...data, newData];
    setData(userData);
    updateShowList(userData);
    toggleModal();
  };

  const handleDeleteClick = (id) => {
    const newData = [...data];
    const index = data.findIndex((el) => el.id === id);
    newData.splice(index, 1);
    setData(newData);
    updateShowList(newData);
  };

  const handleUpdateClick = (e, element) => {
    e.preventDefault();
    const formValues = {
      id: element.id,
      name: element.name,
      username: element.username,
      website: element.website,
      email: element.email,
    };

    setAddFormData(formValues);
    updateModalType("update");
    toggleModal();
    setAddFormData(element);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedData = {
      id: addFormData.id,
      name: addFormData.name,
      username: addFormData.username,
      website: addFormData.website,
      email: addFormData.email,
    };

    const newData = [...data];

    const index = data.findIndex((el) => el.id === addFormData.id);

    newData[index] = editedData;

    setData(newData);
    updateShowList(newData);
    toggleModal();
  };

  const handleViewClick = (e, element) => {
    toggleModal();
    updateModalType("view");
    setAddFormData(element);
  };

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
            setAddFormData({ name: "", username: "", website: "", email: "" });
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
        formData={addFormData}
        handleEditFormSubmit={(e) => handleEditFormSubmit(e)}
        handleAddFormChange={(e) => handleAddFormChange(e)}
        handleAddFormSubmit={(e) => handleAddFormSubmit(e)}
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
          {showList?.length
            ? showList?.map((d) => (
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
                      onClick={(e) => handleUpdateClick(e, d)}
                    />
                    <input
                      type="button"
                      value="DELETE"
                      className="deleteBtn"
                      onClick={() => handleDeleteClick(d.id)}
                    />
                    <input
                      type="button"
                      value="VIEW"
                      className="simpleButton"
                      onClick={(e) => handleViewClick(e, d)}
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

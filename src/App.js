import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersList,
  removeUserFromList,
  updateUserDetails,
} from "./redux/actions/userAction";
import "./assets/style.css";
import { closeIcon, deleteIcon, editIcon, saveIcon } from "./assets/icons";

function App() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state?.users);

  const [selectedRow, selectToEdit] = useState(-1);
  const [inputs, setInputs] = useState({});

  const handleDeleteUser = ({ name, id }) => {
    if (window.confirm(`Are you sure want to remove "${name}" ?`))
      dispatch(removeUserFromList(id));
    else selectToEdit(-1);
  };

  const handleInputChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    if (key === "city" || key === "zipcode") {
      let address = { ...inputs.address, [key]: value };
      setInputs((inputs) => ({
        ...inputs,
        address,
      }));
    } else
      setInputs((inputs) => ({
        ...inputs,
        [key]: value,
      }));
  };

  const handleEditUser = () => {
    dispatch(updateUserDetails(inputs));
    selectToEdit(-1);
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const handleUserList = () =>
    list?.map((user, index) => (
      <tr
        style={{
          background: index === selectedRow ? "lightgray" : "",
          color: index === selectedRow ? "#fff" : "gray",
        }}
        key={index}
      >
        {selectedRow === index ? (
          <>
            <td>
              {index < 9 ? "0" : null}
              {index + 1}
            </td>
            <td>
              {user.id < 9 ? "0" : null}
              {user.id}
            </td>
            <td>
              <input
                name="name"
                type="text"
                value={inputs.name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name="email"
                type="text"
                value={inputs.email}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name="phone"
                type="text"
                value={inputs.phone}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name="city"
                type="text"
                value={inputs.address.city}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name="zipcode"
                type="text"
                value={inputs.address.zipcode}
                onChange={handleInputChange}
              />
            </td>
            <td align="center">
              <button type="button" onClick={handleEditUser}>
                <img alt="save" src={saveIcon} />
              </button>
              <button type="button" onClick={() => selectToEdit(-1)}>
                <img alt="close" src={closeIcon} />
              </button>
            </td>
          </>
        ) : (
          <>
            <td>
              {index < 9 ? "0" : null}
              {index + 1}
            </td>
            <td>
              {user.id < 9 ? "0" : null}
              {user.id}
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            {selectedRow >= 0 ? (
              <>
                <td>{user.address.city}</td>
                <td>{user.address.zipcode}</td>
              </>
            ) : (
              <td>
                {user.address.city} ({user.address.zipcode})
              </td>
            )}
            <td align="center">
              <button
                type="button"
                onClick={() => {
                  selectToEdit(index);
                  setInputs(user);
                }}
                disabled={selectedRow >= 0}
              >
                <img alt="edit" src={editIcon} />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteUser(user)}
                disabled={selectedRow >= 0}
              >
                <img alt="delete" src={deleteIcon} />
              </button>
            </td>
          </>
        )}
      </tr>
    ));

  useEffect(() => {
    dispatch(getUsersList());
  }, []); // eslint-disable-line

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <h1>Users List</h1>
      <table>
        <thead align="left">
          <tr align="center">
            <th>S.No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City {selectedRow < 0 && " - Zip"}</th>
            {selectedRow >= 0 && <th>Zipcode</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody align="left">{handleUserList()}</tbody>
      </table>
    </div>
  );
}

export default App;

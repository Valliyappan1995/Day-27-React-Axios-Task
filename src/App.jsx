import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { getAllUsers, createUser, deleteUser, editUser } from "./user";

const User = ({
  name,
  email,
  phone,
  username,
  website,
  id,
  removeUser,
  loadUserForEdit,
}) => {
  return (
    <div className="user-card">
      <p>
        <b>Name : </b>
        {name}
      </p>
      <p>
        <b>Username : </b>
        {username}
      </p>
      <p>
        <b>Email : </b>
        {email}
      </p>
      <p>
        <b>Phone :</b> {phone}
      </p>
      <p>
        <b>Website : </b>
        {website}
      </p>
      <button className="delete" onClick={() => removeUser(id)}>
        Delete
      </button>
      <button className="edit" onClick={() => loadUserForEdit(id)}>
        Edit
      </button>
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  id: PropTypes.number,
  removeUser: PropTypes.func,
  loadUserForEdit: PropTypes.func,
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    website: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const loadAllUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  const removeUser = async (userId) => {
    await deleteUser(userId);

    setUsers(users.filter((user) => user.id !== userId));
  };

  const loadUserForEdit = (userId) => {
    setEditingUser(userId);

    const data = users.find((user) => user.id === userId);

    setFormData(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingUser === null) {
      const formsData = await createUser(formData);

      setUsers([...users, formsData]);

      setFormData(formData);
    } else {
      const formsData = await editUser(formData, editingUser);

      const temp = [...users];

      const index = users.findIndex((user) => user.id === editingUser);

      temp[index] = formsData;

      setUsers(temp);

      setFormData(formData);
    }
    setFormData({ name: "", email: "", phone: "", username: "", website: "" });
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  return (
    <div>
      <h1>User Management System</h1>
      {console.log(users)}

      {/* Add User Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="username">UserName :</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="phone">Phone : </label>
        <input
          type="phone"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="website">Website : </label>
        <input
          type="url"
          id="website"
          name="website"
          placeholder="website"
          value={formData.website}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <div className="user-container">
        {users.map((user) => {
          return (
            <User
              {...user}
              key={user.id}
              removeUser={removeUser}
              loadUserForEdit={loadUserForEdit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;

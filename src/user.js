import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 10000,
  headers: { batch: "B52WETAMIL" },
});

// Read all the Users
const getAllUsers = async () => {
  try {
    const response = await instance.get("/users");
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    alert("Something went wrong");
  }
};
//Create the new user
const createUser = async (formsData) => {
  try {
    const response = await instance.post("/users", formsData);
    return response.data;
  } catch (e) {
    console.log(e);
    alert("Something went wrong");
  }
};
//Edit the user
const editUser = async (formsData, userId) => {
  try {
    const response = await instance.put(`/users/${userId}`, formsData);
    return response.data;
  } catch (e) {
    console.log(e);
    alert("Something went wrong");
  }
};
//Delete the user
const deleteUser = async (userId) => {
  try {
    await instance.delete(`/users/${userId}`);
    return { msg: "successfully deleted" };
  } catch (e) {
    console.log(e);
    alert("Something went wrong");
  }
};

export { getAllUsers, createUser, editUser, deleteUser };

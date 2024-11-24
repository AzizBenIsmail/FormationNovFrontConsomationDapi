import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAllUsers,
  deleteUser,
  adduser,
  updateUser,
  getOrderAllUsersByAge,
  searchUsersByName,
  adduserwithImg,
} from "../../Service/apiUser";
// components

export default function CardTable({ color }) {
  const [users, setUsers] = useState([]); //bech recupreation feha liste users
  const [search, setSearch] = useState(""); //champs recherche
  const [error, setError] = useState("")

  const [newUser, setNewUser] = useState({
    //pour ajouter un user
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(undefined); //pour ajouter une image

  const handelChange = (e) => {
    const { name, value } = e.target; //
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  };

  
  const handelChangefile = (e) => { //pour ajouter une image
    setImage(e.target.files[0]);
  };

  const searchUser = useCallback(async (search) => {
    await searchUsersByName(search)
      .then((res) => {
        console.log(res.data.userList);
        setUsers(res.data.userList);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUsers = useCallback(async () => {
    await getAllUsers()
      .then((res) => {
        console.log(res.data.userList);
        setUsers(res.data.userList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      await adduser(newUser);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUserWithImg = async () => {
    try {

      if(!image){
       // alert('Please ajouter votre image');

       setError('Please ajouter votre image');
        return;
      }

      const formData = new FormData(); //pour L'image
      formData.append("firstName", newUser.firstName);
      formData.append("lastName", newUser.lastName);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      if(image !== null) {
      formData.append("image_user", image);
      console.log("test");
      }
      await adduserwithImg(formData);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateUser = async (newUser) => {
    try {
      await updateUser(newUser._id, newUser);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const trieUsers = useCallback(async () => {
    await getOrderAllUsersByAge()
      .then((res) => {
        console.log(res.data.userList);
        setUsers(res.data.userList);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   getUsers();
  // }, [getUsers]);

  useEffect(() => {
    getUsers();

    const interval = setInterval(() => {
      getUsers();
    }, 35000);

    return () => clearInterval(interval);
  }, [getUsers]);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Users List
              </h3>
              <button
                className="ml-3 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => {
                  trieUsers();
                }}
              >
                Trie
              </button>
              <input
                type="text"
                placeholder="search by First Name"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              ></input>
              <button
                type="button"
                onClick={(e) => {
                  searchUser(search);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Images
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  firstname
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  lastname
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  age
                </th>{" "}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={`http://localhost:5000/images/Users/${user.user_image}`}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      Img
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.firstName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.lastName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">{user.age}</div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">{user.email}</div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">
                      <button
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => {
                          handleDeleteUser(user._id);
                        }}
                      >
                        Supprimer
                      </button>
                      <button
                        className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => {
                          setNewUser(user);
                        }}
                      >
                        UpdateUser
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <input
          className="ml-2"
          type="text"
          name="firstName"
          onChange={handelChange}
          value={newUser.firstName}
          placeholder="first name"
        />
        <input
          className="ml-2"
          type="text"
          name="lastName"
          onChange={handelChange}
          value={newUser.lastName}
          placeholder="last name"
        />
        <input
          className="ml-2"
          type="number"
          name="age"
          value={newUser.age}
          onChange={handelChange}
          placeholder="age "
        />
        <input
          className="ml-2"
          type="text"
          name="email"
          onChange={handelChange}
          value={newUser.email}
          placeholder="email"
        />
        <input
          className="ml-2"
          type="password"
          name="password"
          value={newUser.password}
          onChange={handelChange}
          placeholder="password "
        />
        <br></br>
        <input //pour ajouter un image
          className="ml-2"
          type="file"
          name="image_user"
          onChange={handelChangefile}
        />
        {error && (<p className="text-red-500 ">{error}</p>)}
        <div className="mt-2 ml-2">
          <button
            onClick={handleAddUser}
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            AddUser
          </button>
          <button
            onClick={handleAddUserWithImg}
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            adduserwithImg
          </button>
          <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={() => {
              handleUpdateUser(newUser);
            }}
          >
            UpdateUser
          </button>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

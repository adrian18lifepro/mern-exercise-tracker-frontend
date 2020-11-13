import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const user = {
      username: username,
    };
    console.log(`You just added user: ${user.username}`);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    // set the username to blank
    setUsername("");
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

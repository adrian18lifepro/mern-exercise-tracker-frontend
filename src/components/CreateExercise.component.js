import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateExercise = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const selectRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        // console.log(res.data);
        setUsers(res.data.map((user) => user.username));
        setUsername(res.data[0].username);
      }
    });
    // setUsers([...users, "test user"]);
    // setUsername("test user");
    // console.log(`This is users: ${users}`);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // alert(`callded from onSubmitHandler, description: ${description}`);
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Create New Exercise</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="">Username: </label>
          <select
            ref={selectRef}
            // required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="form-contrl"
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Duration: (in minutes)</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;

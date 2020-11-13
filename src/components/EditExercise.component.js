import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EditExercise = (props) => {
  // // const [users, setUsers] = useState([]);
  // const selectRef = useRef(null);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    console.log(props.location.exercise);
    setUsername(props.location.exercise.username);
    setDescription(props.location.exercise.description);
    setDuration(props.location.exercise.duration);
    setDate(Date.parse(props.location.exercise.date));
    setId(props.location.exercise._id);

    // axios.get("http://localhost:5000/exercises").then((res) => {
    //   if (res.data.length > 0) {
    //     // console.log(res.data);
    //     setUsers(res.data.map((user) => user.username));
    //     setUsername(res.data[0].username);
    //   }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(Object.keys(props.location.exercise));
    console.log(props.location.exercise.date);

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    axios
      .post("http://localhost:5000/exercises/update/" + id, exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Update New Exercise</h3>
      <button onClick={onSubmitHandler}>Click</button>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="">Username: </label>
          <select
            // ref={selectRef}
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="form-contrl"
          >
            <option>{username}</option>
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
            value="Save Exercise"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;

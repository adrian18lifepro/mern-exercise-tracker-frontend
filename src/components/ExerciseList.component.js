import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Exercise from "./Exercise.subcomponent";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // console.log("called from useEffect() ExerciseList");
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        setExercises(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteExerciseHandler = (id) => {
    // console.log(`called from deleteExerciseHandler  ${id}`);
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    setExercises(exercises.filter((ex) => ex._id !== id)); // check db the column is _id, not id
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thread-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th>{exercises[0].username}</th>
            <th>{exercises[0].description}</th>
            <th>{exercises[0].duration}</th>
            <th>{exercises[0].date.substring(0, 10)}</th>
          </tr> */}
          {exercises.map((exercise) => (
            <Exercise
              exercise={exercise}
              deleteExercise={deleteExerciseHandler}
              key={exercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;

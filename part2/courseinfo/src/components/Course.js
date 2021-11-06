import React from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ name, exercises, id }) => {
  return (
    <p key={id}>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part
          key={part.id}
          id={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
    </>
  );
};

const Total = ({ exercises }) => {
  return (
    <h4>
      total of {exercises.reduce((accum, curr) => accum + curr)} exercises
    </h4>
  );
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </div>
  ));
};

export default Course;

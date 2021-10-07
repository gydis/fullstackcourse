import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, number }) => (
  <tr>
    <td>{text}</td>
    <td> {number}</td>
  </tr>
);

const Statistics = (props) => {
  const good = props.good;
  const bad = props.bad;
  const neutral = props.neutral;
  const all = good + bad + neutral;
  if (all === 0) return <div>No feedback given</div>;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" number={good} />
        <StatisticLine text="neutral" number={neutral} />
        <StatisticLine text="bad" number={bad} />
        <StatisticLine text="all" number={all} />
        <StatisticLine text="average" number={(good - bad) / all} />
        <StatisticLine text="positive" number={(good / all) * 100 + " %"} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

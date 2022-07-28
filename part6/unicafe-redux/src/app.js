import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const good = () => {
    dispatch({
      type: "GOOD",
    });
  };

  const ok = () => {
    dispatch({
      type: "OK",
    });
  };

  const bad = () => {
    dispatch({
      type: "BAD",
    });
  };

  const reset = () => {
    dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.good}</div>
      <div>ok {store.ok}</div>
      <div>bad {store.bad}</div>
    </div>
  );
};

export default App;

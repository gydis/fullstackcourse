import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  notificationOn,
  notificationOff,
  setNotificationText,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter;
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(filter)
    );
  });
  const dispatch = useDispatch();

  const handleClick = (anecdote) => async () => {
    dispatch(vote(anecdote.id));
    dispatch(setNotificationText(`You voted for ${anecdote.content}`));
    dispatch(notificationOn());
    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
    dispatch(notificationOff());
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

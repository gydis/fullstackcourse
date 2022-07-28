import { useDispatch } from "react-redux";
import { newAnec } from "../reducers/anecdoteReducer";
import {
  notificationOn,
  notificationOff,
  setNotificationText,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;

    dispatch(newAnec(anecdote));
    dispatch(setNotificationText(`You added ${anecdote}`));
    dispatch(notificationOn());
    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
    dispatch(notificationOff());
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE": {
      const anecdoteToChange = state.find((an) => an.id === action.data);
      const newAnec = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((n) => (n.id === anecdoteToChange.id ? newAnec : n))
        .sort((a, b) => b.votes - a.votes);
    }
    case "NEW": {
      const newAnecContent = action.data;
      const newAnec = {
        content: newAnecContent,
        id: getId(),
        votes: 0,
      };
      return state.concat(newAnec);
    }
    default:
      return state;
  }
};

export const vote = (id) => {
  return {
    type: "VOTE",
    data: id,
  };
};

export const newAnec = (anecdote) => {
  return {
    type: "NEW",
    data: anecdote,
  };
};

export default reducer;

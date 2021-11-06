import React, { useState, useEffect } from "react";
import numberService from "./services/numbers";

const Notification = ({ message, error }) => {
  const style = error
    ? {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }
    : {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      };
  if (message === null) return null;
  else
    return (
      <div style={style} className="error">
        {message}
      </div>
    );
};

const Person = ({ person, deleteFunc }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={deleteFunc}>delete</button>
    </div>
  );
};

const Persons = ({ persons, search, deleteNum }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((person) => (
      <Person
        key={person.name}
        person={person}
        deleteFunc={() => deleteNum(person.id)}
      />
    ));
};

const Filter = ({ value, onChange }) => {
  return <input value={value} onChange={onChange} />;
};

const PersonForm = ({
  submitHandle,
  numValue,
  nameValue,
  onNameChange,
  onNumChange,
}) => {
  return (
    <form onSubmit={submitHandle}>
      <div>
        name:
        <input onChange={onNameChange} value={nameValue} />
      </div>
      <div>
        number:
        <input onChange={onNumChange} value={numValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    numberService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newObj = {
      name: newName,
      number: newNumber,
    };

    const clean = () => {
      setNewName("");
      setNewNumber("");
    };

    if (persons.map((person) => person.name).includes(newName)) {
      const answer = window.confirm(
        `${newName} is already added to phonebook, repalce the old number with the new one?`
      );
      if (answer) {
        const person = persons.find((x) => x.name === newObj.name);
        numberService
          .update(person.id, newObj)
          .then((data) =>
            setPersons(persons.map((x) => (x.name === newObj.name ? data : x)))
          )
          .then((data) => {
            setErrorMessage(`Changed ${person.name}`);
            setTimeout(() => setErrorMessage(null), 5000);
          })
          .catch((error) => {
            setError(true);
            setErrorMessage(
              `Information of ${person.name} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
              setError(false);
            }, 5000);
            setPersons(persons.filter((x) => x.id !== person.id));
          });
      }
      clean();
      return;
    }

    numberService
      .createNum(newObj)
      .then((data) => setPersons(persons.concat(data)));
    setErrorMessage(`Added ${newObj.name}`);
    setTimeout(() => setErrorMessage(null), 5000);
    clean();
  };

  const deleteNum = (id) => {
    const person = persons.find((x) => x.id === id);
    if (window.confirm(`Delete ${person.name}?`))
      numberService
        .deleteNum(id)
        .then((response) => setPersons(persons.filter((x) => x.id !== id)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} error={error} />
      <Filter
        value={newSearch}
        onChange={(event) => {
          setNewSearch(event.target.value);
        }}
      />
      <h3>Add a new</h3>
      <PersonForm
        submitHandle={handleSubmit}
        numValue={newNumber}
        nameValue={newName}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={newSearch} deleteNum={deleteNum} />
    </div>
  );
};

export default App;

import React from "react";
import Greetings from "./Greetings";
import Counter from "./Counter";
import MyForm from "./MyForm";
import "./App.css";
import ReducerSample from "./ReducerSample";

const App = () => {
  const onClick = (name: string) => {
    console.log(name);
  };
  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };
  return <ReducerSample />;
};

export default App;

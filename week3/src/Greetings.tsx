/* eslint-disable no-restricted-globals */
import React from "react";

type GreetingsProps = {
  name: string;
  mark: string;
  children?: React.ReactNode;
  onClick: (name: string) => void;
};

const Greetings = (props: GreetingsProps) => {
  const handleClick = () => props.onClick(props.name);
  return (
    <div>
      Hello, {props.name}
      {props.mark}
      <div>
        <button onClick={handleClick}>click me</button>
      </div>
    </div>
  );
};
Greetings.defaultProps = {
  mark: "!"
};
export default Greetings;

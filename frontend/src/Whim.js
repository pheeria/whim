import React, { useState } from "react";
import "./Whim.css";

const Whim = () => {
  const [answer, setAnswer] = useState();
  const onChange = e => {
    setAnswer(e.target.value);
  };
  const onClick = e => console.log(answer);
  return (
    <main>
      <span>happy</span>
      <span>14</span>
      <label>
        <input type="radio" name="answer" value="a" onChange={onChange} />
        <img
          alt=""
          src="https://images.unsplash.com/photo-1516741247836-f66dfdfd1b22?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ"
        />
      </label>
      <label>
        <input type="radio" name="answer" value="b" onChange={onChange} />
        <img
          alt=""
          src="https://images.unsplash.com/photo-1485110168560-69d4ac37b23e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ"
        />
      </label>
      <label>
        <input type="radio" name="answer" value="x" onChange={onChange} />
        <img
          alt=""
          src="https://images.unsplash.com/photo-1520572218395-c61280bb73ae?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ"
        />
      </label>
      <label>
        <input type="radio" name="answer" value="y" onChange={onChange} />
        <img
          alt=""
          src="https://images.unsplash.com/photo-1481608790904-6b47c88e5b00?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ"
        />
      </label>

      <button onClick={onClick}>Check</button>
    </main>
  );
};

export default Whim;

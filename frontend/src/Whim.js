import React, { useState } from "react";
import "./Whim.css";

const Whim = () => {
  const [answer, setAnswer] = useState();
  const onChange = e => {
    setAnswer(e.target.value);
  };
  const onClick = e => console.log(answer);
  const fromServer = {
    options: [
      "https://images.unsplash.com/photo-1520548568350-fab9b9ebc923?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ",
      "https://images.unsplash.com/photo-1503467262827-9c70e78ac329?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ",
      "https://images.unsplash.com/photo-1522726832281-362409683a2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ",
      "https://images.unsplash.com/photo-1548777123-b54e9310e1bf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjYwODEwfQ"
    ],
    keyword: "far",
    answer: 0
  };
  return (
    <main>
      <span>{fromServer.keyword}</span>
      <span>14</span>

      {[0, 1, 2, 3].map(i => (
        <label>
          <input type="radio" name="answer" value={i} onChange={onChange} />
          <img alt="" src={fromServer.options[i]} />
        </label>
      ))}

      <button onClick={onClick}>Check</button>
    </main>
  );
};

export default Whim;

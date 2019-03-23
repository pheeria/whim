import React, { useState } from "react";
import "./Whim.css";

const Whim = ({ answer, keyword, options, highscore, onNext }) => {
  const [guess, setGuess] = useState();
  const onClick = e => console.log(guess + " " + answer);
  return (
    <main>
      <span>{keyword}</span>
      <span>{highscore}</span>

      {[0, 1, 2, 3].map(i => (
        <label key={i}>
          <input
            type="radio"
            name="answer"
            value={i}
            onChange={e => setGuess(e.target.value)}
          />
          <img alt="" src={options[i]} />
        </label>
      ))}

      <button onClick={onClick}>Check</button>
      <button onClick={onNext}>Next</button>
    </main>
  );
};

export default Whim;

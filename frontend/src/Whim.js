import React, { useState } from "react";
import "./Whim.css";

const Whim = ({ answer, keyword, options, highscore, onNext, onSuccess }) => {
  const [guess, setGuess] = useState(-1);
  const [canProceed, setCanProceed] = useState(false);
  const onClick = e => {
    if (+guess === +answer) {
      onSuccess();
      setGuess(-1);
    }
    setCanProceed(true);
  };
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

      <button onClick={onClick} disabled={guess === -1}>
        Check
      </button>
      <button onClick={onNext} disabled={!canProceed}>
        Next
      </button>
    </main>
  );
};

export default Whim;

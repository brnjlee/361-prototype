import React, { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Target = () => {
  const [boxes, setBox] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
  const [pos, setPos] = useState(0);

  useInterval(() => {
    if (pos >= 15) {
      setPos(0);
    } else {
      setPos(pos + 1);
    }
  }, 500);

  useEffect(() => {
    console.log(!!boxes[pos]);
  }, [pos]);

  const handleClick = position => {
    let copy = boxes;
    copy.splice(position, 1, !!boxes[position] ? 0 : 1);
    setBox([...copy]);
  };
  const loop = boxes.map((box, i) => {
    return (
      <TargetBox
        key={i}
        id={i}
        handleClick={position => handleClick(position)}
        selected={!!box}
        play={pos === i}
      />
    );
  });
  return <div className="target">{loop}</div>;
};

const TargetBox = ({ id, selected, handleClick, play }) => {
  return (
    <div
      className={`target__box ${selected ? "selected" : null} ${
        play ? "play" : null
      }`}
      onClick={() => handleClick(id)}
    ></div>
  );
};

export default Target;

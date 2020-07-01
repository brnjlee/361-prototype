import React, { useState, useEffect, useRef } from "react";

const Target = ({ src, pos }) => {
  const audio = useRef(null);
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

  useEffect(() => {
    if (!!boxes[pos]) {
      audio.current.play();
      audio.current.currentTime = 0;
    }
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
  return (
    <div className="target">
      {loop}
      <audio id={1} className="clip" src={src} ref={audio}></audio>
    </div>
  );
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

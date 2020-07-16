import React, { useState, useEffect, useRef } from "react";

const Target = ({ src, pos, color, title, notes, setNotes }) => {
  const audio = useRef(null);

  useEffect(() => {
    if (!!notes[pos]) {
      audio.current.play();
      audio.current.currentTime = 0;
    }
  }, [pos]);

  const handleClick = position => {
    setNotes(position);
  };
  const loop = notes.map((box, i) => {
    return (
      <TargetBox
        key={i}
        id={i}
        handleClick={position => handleClick(position)}
        selected={!!box}
        play={pos === i}
        color={color}
      />
    );
  });
  return (
    <div className="target">
      <div style={{ background: color }} className="target__title">
        {title}
      </div>
      {loop}
      <audio id={1} className="clip" src={src} ref={audio}></audio>
    </div>
  );
};

const TargetBox = ({ id, selected, handleClick, play, color }) => {
  return (
    <div
      style={{ background: selected ? color : null }}
      className={`target__box ${selected ? "selected" : null} ${
        play ? "play" : null
      }`}
      onClick={() => handleClick(id)}
    ></div>
  );
};

export default Target;

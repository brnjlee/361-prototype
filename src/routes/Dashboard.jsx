import React, { useState, useEffect, useRef } from "react";
import Target from "../components/Target";

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

export const Dashboard = () => {
  const [pos, setPos] = useState(0);

  useInterval(() => {
    if (pos >= 15) {
      setPos(0);
    } else {
      setPos(pos + 1);
    }
  }, 300);
  return (
    <div className="room__container">
      <Target
        src={"https://www.myinstants.com/media/sounds/snare.mp3"}
        pos={pos}
      />
      <Target
        src={"https://www.myinstants.com/media/sounds/bass-drum.mp3"}
        pos={pos}
      />
      <Target
        src={"http://www.masterbits.de/sc_docu/sounds1/1TM00013.MP3"}
        pos={pos}
      />
      <Target src="/assets/hihat.mp3" pos={pos} />
    </div>
  );
};

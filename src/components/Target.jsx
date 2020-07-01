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
  const [boxes, setBox] = useState([...initBoxes]);
  const [pos, setPos] = useState(0);

  useInterval(() => {
    if (pos >= 15) {
      setPos(0);
    } else {
      setPos(pos + 1);
    }
  }, 500);

  useEffect(() => {
    console.log(boxes[pos].selected);
  }, [pos]);

  const handleClick = position => {
    console.log(position);
    let copy = boxes;
    copy.splice(position, 1, {
      position,
      selected: !boxes[position].selected
    });
    setBox([...copy]);
  };
  const boxLoop = boxes.map(box => {
    return (
      <TargetBox
        key={box.position}
        id={box.position}
        handleClick={position => handleClick(position)}
        selected={box.selected}
        play={pos === box.position}
      />
    );
  });
  return <div className="target">{boxLoop}</div>;
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
const initBoxes = [
  {
    position: 0,
    selected: false
  },
  {
    position: 1,
    selected: false
  },
  {
    position: 2,
    selected: false
  },
  {
    position: 3,
    selected: false
  },
  {
    position: 4,
    selected: false
  },
  {
    position: 5,
    selected: false
  },
  {
    position: 6,
    selected: false
  },
  {
    position: 7,
    selected: false
  },
  {
    position: 8,
    selected: false
  },
  {
    position: 9,
    selected: false
  },
  {
    position: 10,
    selected: false
  },
  {
    position: 11,
    selected: false
  },
  {
    position: 12,
    selected: false
  },
  {
    position: 13,
    selected: false
  },
  {
    position: 14,
    selected: false
  },
  {
    position: 15,
    selected: false
  }
];

export default Target;

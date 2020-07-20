import React, { useState, useEffect, useRef } from "react";
import Target from "../components/Target";
import { GrUndo, GrRedo } from "react-icons/gr";
import { GAModal } from "../components/GAModal";
import { ExecuteGA } from "../ga/population";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import "./Room.css";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

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

export const Room = () => {
  const [pos, setPos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [tempo, setTempo] = useState(100);
  //Undo Redo state
  const [activity, setActivity] = useState({
    past: [],
    future: []
  });
  const [notes, setNotes] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);

  useInterval(() => {
    if (pos >= 15) {
      setPos(0);
    } else {
      setPos(pos + 1);
    }
  }, 15000 / tempo);

  const handleNoteChange = (column, row) => {
    let copy = notes;
    copy[row].splice(column, 1, !!copy[row][column] ? 0 : 1);
    setNotes(copy);
    let activityCopy = activity;
    setActivity({ past: [...activityCopy.past, [column, row]], future: [] });
  };

  const handleUndo = () => {
    if (activity.past.length === 0) return;
    let activityCopy = activity;
    const lastActivity = activityCopy.past.pop();
    if (lastActivity.length > 2) {
      setNotes(lastActivity);
    } else {
      const [column, row] = lastActivity;
      activityCopy.future.push([column, row]);
      let copy = notes;
      copy[row].splice(column, 1, !!copy[row][column] ? 0 : 1);
      setNotes(copy);
    }
    setActivity(activityCopy);
  };

  const handleRedo = () => {
    if (activity.future.length === 0) return;
    let activityCopy = activity;
    const [column, row] = activityCopy.future.pop();
    activityCopy.past.push([column, row]);
    let copy = notes;
    copy[row].splice(column, 1, !!copy[row][column] ? 0 : 1);
    setNotes(copy);
    setActivity(activityCopy);
  };

  const changeTempo = val => {
    setTempo(val);
  };

  const executeGA = (mutationRate, generations, totalPopulation) => {
    let target = [];
    for (let i = 0; i < notes.length; i++) {
      target = [...target, ...notes[i]];
    }

    const result = ExecuteGA(
      target,
      mutationRate,
      generations,
      totalPopulation
    );
    let newNotes = [];
    for (let i = 0; i < result.length; i++) {
      newNotes.push(result.splice(0, 16));
    }
    setActivity({ past: [...activity.past, notes], future: [] });
    setNotes(newNotes);
    setShowModal(false);
  };

  return (
    <div className="room__container">
      <div className="room__header">Click the keys to make a beat</div>
      <div className="targets">
        <Target
          src={"https://www.myinstants.com/media/sounds/snare.mp3"}
          pos={pos}
          color={"#00B26A"}
          notes={notes[0]}
          setNotes={column => handleNoteChange(column, 0)}
          title="Snare"
        />
        <Target
          src={"https://www.myinstants.com/media/sounds/bass-drum.mp3"}
          pos={pos}
          color={"#9061A1"}
          notes={notes[1]}
          setNotes={column => handleNoteChange(column, 1)}
          title="Bass"
        />
        <Target
          src={"http://www.masterbits.de/sc_docu/sounds1/1TM00013.MP3"}
          pos={pos}
          color={"#FFCA45"}
          notes={notes[2]}
          setNotes={column => handleNoteChange(column, 2)}
          title="Tom-tom"
        />
        <Target
          color={"#EA5F50"}
          src="/assets/hihat.mp3"
          pos={pos}
          notes={notes[3]}
          setNotes={column => handleNoteChange(column, 3)}
          title="Hihat"
        />
      </div>
      <OptionBar
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        openGAModal={() => {
          setShowModal(true);
        }}
        changeTempo={val => changeTempo(val)}
        tempo={tempo}
      />
      <GAModal
        open={showModal}
        closeModal={() => setShowModal(false)}
        executeGA={(mut, gen, pop) => executeGA(mut, gen, pop)}
      />
      {showModal && <div className="overlay" />}
    </div>
  );
};

const OptionBar = ({
  handleUndo,
  handleRedo,
  openGAModal,
  changeTempo,
  tempo
}) => {
  return (
    <div className="optionBar__container">
      <div className={`optionBar__option`} onClick={() => handleUndo()}>
        <GrUndo className="optionBar__icon" />
      </div>
      <div className={`optionBar__option`} onClick={() => handleRedo()}>
        <GrRedo className="optionBar__icon" />
      </div>
      <div className="tempo-container">
        <PrettoSlider
          defaultValue={100}
          getAriaValueText={val => `${val * 100}%`}
          aria-labelledby="discrete-slider-custom"
          valueLabelDisplay="auto"
          step={1}
          min={15}
          max={300}
          onChange={(e, val) => {
            changeTempo(val);
          }}
        />
      </div>
      <div className={`optionBar__button`} onClick={() => openGAModal()}>
        Generate
      </div>
    </div>
  );
};

const PrettoSlider = withStyles({
  root: {
    color: "#475e83",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

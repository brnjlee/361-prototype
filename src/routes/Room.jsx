import React, { useState, useEffect, useRef } from "react";
import Target from "../components/Target";
import { GrUndo, GrRedo } from "react-icons/gr";
import { Modal } from "../components/Modal";
import { ExecuteGA } from "../ga/population";

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
    const [column, row] = activityCopy.past.pop();
    activityCopy.future.push([column, row]);
    let copy = notes;
    copy[row].splice(column, 1, !!copy[row][column] ? 0 : 1);
    setNotes(copy);
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

  const changeTempo = e => {
    e.preventDefault();
    setTempo(e.target.quantity.value);
  };

  const executeOrder66 = (mutationRate, generations, totalPopulation) => {
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
        changeTempo={e => changeTempo(e)}
        tempo={tempo}
      />
      <Modal
        open={showModal}
        closeModal={() => setShowModal(false)}
        executeOrder66={(mut, gen, pop) => executeOrder66(mut, gen, pop)}
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
      <form onSubmit={e => changeTempo(e)}>
        <input
          className="optionBar__input"
          type="number"
          id="quantity"
          name="quantity"
          defaultValue={tempo}
          min="1"
          max="300"
        />
      </form>
      <div className={`optionBar__button`} onClick={() => openGAModal()}>
        Generate
      </div>
    </div>
  );
};

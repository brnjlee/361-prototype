import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import "./Modal.css";

export const Modal = ({ open, closeModal, executeOrder66 }) => {
  const [mutationRate, setMutationRate] = useState(0.02);
  const [generations, setGenerations] = useState(1000);
  const [population, setPopulation] = useState(200);

  return (
    <div className={`modal__container ${open && "open"}`}>
      <div className="modal__close-button" onClick={() => closeModal()}>
        <FiArrowLeft className="modal__icon" />
      </div>
      <div className="modal__options">
        <Typography id="discrete-slider" gutterBottom>
          Mutation Rate
        </Typography>
        <PrettoSlider
          defaultValue={mutationRate}
          getAriaValueText={val => `${val * 100}%`}
          aria-labelledby="discrete-slider-custom"
          valueLabelDisplay="auto"
          step={0.01}
          marks={mutationMarks}
          min={0.01}
          max={0.1}
          onChange={(e, val) => setMutationRate(val)}
        />
        <Typography id="discrete-slider" gutterBottom>
          Generations
        </Typography>
        <PrettoSlider
          defaultValue={generations}
          getAriaValueText={val => `${val}%`}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={100}
          marks={generationMarks}
          min={100}
          max={10000}
          onChange={(e, val) => setGenerations(val)}
        />
        <Typography id="discrete-slider" gutterBottom>
          Population
        </Typography>
        <PrettoSlider
          defaultValue={population}
          getAriaValueText={val => `${val}%`}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={50}
          marks={populationMarks}
          min={50}
          max={1000}
          onChange={(e, val) => setPopulation(val)}
        />
      </div>

      <div
        className={`optionBar__button`}
        onClick={() => executeOrder66(mutationRate, generations, population)}
      >
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

const mutationMarks = [
  {
    value: 0.01,
    label: "1%"
  },
  {
    value: 0.1,
    label: "10%"
  }
];
const generationMarks = [
  {
    value: 100,
    label: "100"
  },
  {
    value: 10000,
    label: "10000"
  }
];
const populationMarks = [
  {
    value: 50,
    label: "50"
  },
  {
    value: 1000,
    label: "1000"
  }
];

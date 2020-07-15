import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./Create.css";
import { Redirect } from "react-router-dom";

export const Create = () => {
  const [redirect, setRedirect] = useState("");
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    setRedirect("/room/abcdef");
  };

  if (redirect)
    return (
      <Redirect
        to={{
          pathname: redirect
        }}
      />
    );

  return (
    <div className="create__container">
      <div className="create__modal">
        <div className="create__header">Create a session</div>
        <form className="create__form" onSubmit={handleSubmit(onSubmit)}>
          <label>Share link</label>
          <input name="link" value="https://tunelab/room/abcdef" disabled />
          {errors.email && errors.email.message}
          <label>Share with</label>
          <input
            name="username"
            ref={register({
              validate: value => value !== "admin" || "Nice try!"
            })}
          />
          {errors.username && errors.username.message}

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

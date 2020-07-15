import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Landing } from "./routes/Landing";
import { Create } from "./routes/Create";
import { Dashboard } from "./routes/Dashboard";

import "./App.css";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/create" component={Create} />
          <Route path="/room/:id" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

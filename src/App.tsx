import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Family } from './features/family/Family';
import { Http404 } from './features/errors/404';

const Sample: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
    </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
      </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
      </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
      </a>
      ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
      </a>
        </span>
      </header>
    </div>
  );
}

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.Fragment>
        <h1>MOTTV Derby</h1>
        <Switch>
          <Route path="/family"><Family /></Route>
          <Route path="/sample"><Sample /></Route>
          <Route exact path="/"><Redirect to="/family" /></Route>
          <Route><Http404 /></Route>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Statistics from "./Pages/Statistics";
import Resources from "./Pages/Resources";
import covidImg from './Assets/Images/corona-virus.svg'

function App() {
  return (
    <Router>
      <Main propImg={covidImg}>
        <Header />
        <Switch>
          <Route exact path="/Resources">
            <Resources />
          </Route>
          <Route exact path="/Statistics">
            <Statistics/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

const Main = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: white;
  background: url(${(props) => props.propImg}) no-repeat;
  background-position: center;
  background-position: bottom 20px right 20px;
  background-size:250px 250px;
`;

export default App;

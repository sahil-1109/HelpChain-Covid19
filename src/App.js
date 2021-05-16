import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Statistics from "./Pages/Statistics";
import Resources from "./Pages/Resources";
import covidImg from "./Assets/Images/corona-virus.svg";
import Donate from "./Pages/Donate";
import abi from "./abi";
import NeedHelp from "./Pages/NeedHelp";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("0x0");
  const [contract, setContract] = useState(null);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider try after installing MetaMask!"
      );
    }
    setWeb3(window.web3);
  }
  async function load() {
    await loadWeb3();
  }

  async function setUp() {
    if (!web3) return;
    const acc = await web3.eth.getAccounts();
    setAccount(acc[0]);
    window.account = acc[0];
    const instance = new web3.eth.Contract(
      abi,
      "0x58f5424F4f885a50616f187210EcE24db0a7A47a"
    );
    setContract(instance);
    window.instance = instance;
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (web3 && account === "0x0") setUp();
  }, [web3, account]);

  return (
    <Router>
      <Main propImg={covidImg}>
        <Header />
        <Switch>
          <Route exact path="/Help">
            <NeedHelp web3={web3} account={account} contract={ contract}/>
          </Route>

          <Route exact path="/Donate">
            <Donate web3={web3} account={account} contract={contract} />
          </Route>
          <Route exact path="/Resources">
            <Resources />
          </Route>
          <Route exact path="/Statistics">
            <Statistics />
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
  background-size: 250px 250px;
`;

export default App;

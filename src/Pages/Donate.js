import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import abi from "../abi";

function Donate(props) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("0x0");
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState("0.01");
  const [recievedData, setRecievedData] = useState([]);
  useEffect(() => {
    if (!web3) {
      setWeb3(props.web3);
      setAccount(props.account);
      setContract(props.contract);
    }
  }, [web3, account, contract]);
  useEffect(() => {
    const fetchDataHandler = async () => {
      const Myresponse = await fetch(
        "https://uw-project-hackathon-default-rtdb.firebaseio.com/patients.json"
      );
      if (!Myresponse.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await Myresponse.json();

      const alldata = [];
      for (const key in data) {
        alldata.push({
          id: key,
          patientName: data[key].patientName,
          value: data[key].value,
          metamask: data[key].metamask,
        });
      }
      setRecievedData(alldata);
    };
    fetchDataHandler();
  }, []);

  const approve = async (e) => {
    e.preventDefault();
    const res = await contract.methods.approveRequest(1).send({
      from: account,
      gas: web3.utils.toHex("50000"),
    });
    console.log(res);
  };
  const exec = async (e) => {
    e.preventDefault();
    console.log("value", String(value), account);
    //.send() for inserting data
    //.call() for quering data
    const res = await contract.methods.contribute().send({
      from: account,
      value: web3.utils.toWei(String(value)),
      gas: web3.utils.toHex("50000"),
    });

    console.log(res);
  };
  const renderElements = recievedData.map((data) => {
    return (
      <ResourceItem>
        <h3>PATIENT NAME: {data.patientName}</h3>
        <h3>Amount Required: {data.value + " Eth"}</h3>
        <button onClick={approve}>Approve</button>
      </ResourceItem>
    );
  });

  return (
    <>
      <Container>
        <Upper>
          <Heading>Be a Contributor</Heading>
          <input
            type="text"
            placeholder="Enter Amount of Ether"
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
          />
          <button onClick={exec}>Donate</button>
        </Upper>
        <DetailedResources>{renderElements}</DetailedResources>
      </Container>
    </>
  );
}
const Upper = styled.div`
  margin-bottom: 80px;
`;
const Container = styled.div`
  border-top: 1px solid black;
  padding: 20px;
  width: 60vw;
  height: 25vh;
  border-radius: 20px;
  box-shadow: 20px 10px 20px 0px rgba(16, 67, 212, 0.52);
  transform: translate(20%, 20%);
  min-width: 600px;

  & > div {
    input {
      margin: 40px auto;

      height: 4rem;
      font-size: 2rem;
      border: 1px solid black;
      border-radius: 0.5rem;
    }
    button {
      height: 4rem;
      font-size: 2rem;
      margin-left: 2rem;
      border: 1px solid black;
      border-radius: 0.5rem;
      background: rgba(16, 67, 212, 0.8);
      color: white;
      cursor: pointer;
    }
  }
`;
const Heading = styled.p`
  font-family: Righteous;
  color: rgba(16, 67, 212, 0.8);
  text-align: center;
  font-size: 3rem;
  border-bottom: 2px solid rgba(16, 67, 212, 0.8);
`;

const ResourceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 0px 5px;
  h3 {
    margin: 0 0 0.25rem 0;
  }
  & > button {
    margin: 10px 0px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
  }
`;

const DetailedResources = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  animation: data-appear 1s ease-out forwards;
  border-top: 1px solid black;
  border-radius: 20px;
  box-shadow: 20px 10px 20px 0px rgba(16, 67, 212, 0.52);
  li:nth-of-type(odd) {
    background-color: rgba(16, 67, 212, 0.52);
    border-radius: 10px;
  }

  @keyframes data-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Donate;

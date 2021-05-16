import React, { useEffect, useState } from "react";
import styled from "styled-components";

function NeedHelp(props) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("0x0");
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState("0.01");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [metamask, setMetamask] = useState("");
  const [recievedData, setRecievedData] = useState([]);
  useEffect(() => {
    if (!web3) {
      setWeb3(props.web3);
      setAccount(props.account);
      setContract(props.contract);
    }
  }, [web3, account, contract]);

  console.log(contract);
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
  const reset = () => {
    setFirstName("");
    setLastName("");
    setValue("");
    setMetamask("");
  };
  const addPatientDetails = (event) => {
    event.preventDefault();
    const patientDetails = {
      patientName: firstName + lastName,
      value: String(value),
      metamask: metamask,
    };
    submitHandler(patientDetails);
    requestMoney1();
    reset();
  };

  const requestMoney1 = async () => {
    const res = await contract.methods
      .requestMoney(firstName + lastName, web3.utils.toWei(value), metamask)
      .send({
        from: account,
        gas: web3.utils.toHex("50000"),
      });
    console.log(res);
  };
  async function submitHandler(details) {
    const response = await fetch(
      "https://uw-project-hackathon-default-rtdb.firebaseio.com/patients.json",
      {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const renderElements = recievedData.map((data) => {
    return (
      <ResourceItem kay={data.key}>
        <h3>PATIENT NAME : {data.patientName}</h3>
        <h3>Amount Required : {data.value + " Eth"}</h3>
      </ResourceItem>
    );
  });
  return (
    <Container>
      <Heading>Need Help</Heading>
      <Form>
        <form onSubmit={addPatientDetails}>
          <Name>
            <div>
              <label htmlFor="fname">
                <strong>First Name:</strong>
              </label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div style={{ margin: "0px 50px" }}>
              <label htmlFor="lname">
                <strong>Last Name:</strong>
              </label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name.."
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>
          </Name>
          <Name>
            <div>
              <label htmlFor="Amount">
                <strong>Amount: </strong>
              </label>
              <input
                id="Amount"
                placeHolder="Enter the Amount"
                type="text"
                onChange={(event) => setValue(event.target.value)}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="Metamask">
                <strong>MetaMask Address: </strong>
              </label>
              <input
                id="MetaMask"
                placeHolder="Enter the Address"
                value={metamask}
                type="text"
                onChange={(event) => setMetamask(event.target.value)}
                required
              ></input>
            </div>
          </Name>
          <input type="Submit"></input>
        </form>
      </Form>
      <DetailedResources>{renderElements}</DetailedResources>
    </Container>
  );
}

const Container = styled.div`
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  width: 800px;
`;
const Heading = styled.p`
  font-family: Righteous;
  color: rgba(16, 67, 212, 0.8);
  text-align: center;
  font-size: 3rem;
  border-bottom: 2px solid rgba(16, 67, 212, 0.8);
`;
const Name = styled.div`
  display: flex;
  align-items: center;
  input:required:invalid {
    border-color: #c00000;
  }
`;
const Form = styled.div`
  form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid black;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 20px 10px 20px 0px rgba(16, 67, 212, 0.52);

    select {
      width: 40%;
      height: 35px;
      background: white;
      color: gray;
      padding-left: 5px;
      font-size: 14px;
      border: none;
      margin-left: 10px;

      option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
      }
    }

    input {
      padding: 12px 20px;
      margin: 8px 10px;
      display: inline-block;
      border: 1px solid rgba(16, 67, 212, 0.52);
      border-radius: 4px;
      box-sizing: border-box;
    }
    input[type="submit"] {
      background-color: rgba(16, 67, 212, 0.52);
    }
  }
`;
const ResourceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  h3 {
    padding: 5px;
    margin: 0 0 0.25rem 0;
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

export default NeedHelp;

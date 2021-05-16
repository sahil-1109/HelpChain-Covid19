import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Resources() {
  const [state, setState] = useState(false);
  const [states, setStates] = useState([]);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [recievedData, setRecievedData] = useState([]);
  const [filterS, setFilterS] = useState(false);
  const [filterR, setFilterR] = useState(false);
  const [filteredState, setFilterState] = useState("");
  const [filteredResource, setFilteredResource] = useState("");

  const filterStateHandler = (event) => {
    event.preventDefault();
    setFilterState(event.target.value);
    setFilterS(true);
  };

  const filterResourceHandler = (event) => {
    event.preventDefault();
    setFilteredResource(event.target.value);
    setFilterR(true);
  };

  useEffect(() => {
    const fetchDataHandler = async () => {
      const Myresponse = await fetch(
        "https://uw-project-hackathon-default-rtdb.firebaseio.com/resources.json"
      );
      if (!Myresponse.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await Myresponse.json();

      const alldata = [];
      for (const key in data) {
        alldata.push({
          id: key,
          FullName: data[key].firstName + ' ' + data[key].lastName,
          ResourceType: data[key].resourceType,
          resourceLink: data[key].resourceLink,
          state: data[key].state,
        });
      }
      setRecievedData(alldata);
    };
    fetchDataHandler();
  }, []);

  console.log(selectedState);
  const onClickState = () => {
    setState(true);
  };
  const onClickCountry = () => {
    setState(false);
  };
  const reset = () => {
    setFirstname("");
    setLastName("");
    setSelectedState("");
    setResourceType("");
    setResourceLink("");
  };
  const onSubmitResource = (event) => {
    event.preventDefault();
    const target = `${state ? selectedState : "INDIA"}`;
    const toAddResource = {
      firstName: firstName,
      lastName: lastName,
      state: target,
      resourceType: resourceType,
      resourceLink: resourceLink,
    };
    reset();
    onSubmitHandler(toAddResource);
  };
  async function onSubmitHandler(props) {
    const response = await fetch(
      "https://uw-project-hackathon-default-rtdb.firebaseio.com/resources.json",
      {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/gov/IN")
        .then((response) => response.json())
        .then((data) => {
          const states = data.states;
          // const DailyActiveCases=data.total.
          setStates(states);
        });
    };
    getData();
  }, []);
  const typeOfResource = [
    "Oxygen",
    "Refill Oxygen",
    "Plasma",
    "Ambulance",
    "Home-Nursing",
    "ICU",
    "Medicines",
  ];
  const resources = typeOfResource.map((resource) => {
    return (
      <option key={resource} value={resource}>
        {resource}
      </option>
    );
  });
  const nameOfState = states.map((state) => {
    return (
      <option key={state.state} value={state.state}>
        {state.state}
      </option>
    );
  });
  //LOGIC FOR FILTERED RESOURCES
  let requiredData;
  if (filterS) {
    if (filterR) {
      const NewData = recievedData.filter(
        (data) => data.state === `${filteredState}`
      );
      requiredData = NewData.filter(
        (data) => data.ResourceType === `${filteredResource}`
      );
    } else {
      requiredData = recievedData.filter(
        (data) => data.state === `${filteredState}`
      );
    }
  } else if (filterR) {
    requiredData = recievedData.filter(
      (data) => data.ResourceType === `${filteredResource}`
    );
  } else {
    requiredData = recievedData;
  }

  const requiredElements = requiredData.map((data) => {
    return (
      <div key={data.key}>
        <h3>Posted by: {data.FullName} </h3>
        <div>
          <strong>Resource-type:</strong> {data.ResourceType}
        </div>
        <a target="_blank" rel="noreferrer" href={data.resourceLink}>
          Resource-link
        </a>
      </div>
    );
  });
  return (
    <Container>
      <Form>
        <form onSubmit={onSubmitResource}>
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
                onChange={(event) => setFirstname(event.target.value)}
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
          <Field>
            <p>
              <strong>Country/State resource:</strong>
            </p>
            <div style={{ margin: "0px 5px" }}>
              <input
                onClick={onClickState}
                type="radio"
                name="field"
                id="state"
                value={selectedState}
                required
              />
              <label htmlFor="State">State</label>
            </div>
            <div style={{ margin: "0px 5px" }}>
              <input
                onClick={onClickCountry}
                type="radio"
                name="field"
                id="Country"
                value="India"
              />
              <label htmlFor="Country">India</label>
            </div>
          </Field>
          {state && (
            <select
              name="state"
              id="state"
              onChange={(event) => setSelectedState(event.target.value)}
              required
            >
              <option value={selectedState} selected disabled hidden>
                Select a State
              </option>
              {nameOfState}
            </select>
          )}
          <div>
            <select
              name="Type"
              id="Type"
              onChange={(event) => setResourceType(event.target.value)}
              required
            >
              <option value={resourceType} selected disabled hidden>
                Select Resource Type
              </option>
              {resources}
            </select>
          </div>
          <label htmlFor="ResourceLink">
            <strong>Add Resource Link:</strong>
          </label>
          <input
            type="url"
            id="ResourceLink"
            name="ResourceLink"
            value={resourceLink}
            onChange={(event) => setResourceLink(event.target.value)}
            reuired
          ></input>
          <p>
            <i>*You can add any Website/doc link having verified Resources*</i>
          </p>

          <input
            type="submit"
            value="Submit"
            style={{ cursor: "pointer" }}
          ></input>
        </form>
      </Form>
      <DetailedResources>
        <select onChange={filterStateHandler}>
          <option value={filteredState} selected disabled hidden>
            Select your State
          </option>
          {nameOfState}
        </select>
        <select onChange={filterResourceHandler}>
          <option value={filteredResource} selected disabled hidden>
            Select Resource Type
          </option>
          {resources}
        </select>
        <ResourceItem>{requiredElements}</ResourceItem>
      </DetailedResources>
    </Container>
  );
}

const Container = styled.div`
  margin: auto;
  margin-top: 40px;
  margin-bottom:40px;
  display: flex;
  flex-direction: column;
  width: 800px;
`;
const Form = styled.div`
  form {
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
const Name = styled.div`
  display: flex;
  align-items: center;
  input:required:invalid {
    border-color: #c00000;
  }
`;

const Field = styled.div`
  display: flex;
  align-items: center;
`;
const DetailedResources = styled.div`
  margin-top: 40px;

  max-width: 80rem;
  animation: data-appear 1s ease-out forwards;
  border-top: 1px solid black;
  padding: 20px;
  min-width: 150px;
  border-radius: 20px;
  box-shadow: 20px 10px 20px 0px rgba(16, 67, 212, 0.52);
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
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

const ResourceItem = styled.li`

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 1rem;
  padding-bottom: 1rem;
  h3 {
    margin: 0 0 0.25rem 0;
  }
  & > div {
    margin: 10px 0px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
`;

export default Resources;

import React ,{useState,useEffect}from "react";
import styled from "styled-components";

function Resources() {
    const [state, setState] = useState(false);
    const [states, setStates] = useState([]);
    const onClickState=()=>{
        setState(true);
    }
    const onClickCountry=()=>{
        setState(false);
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
    const nameOfState = states.map(state=>{
      return <option key={state.state} value={state.state}>{state.state}</option>
    });
    
      
  return (
    <Container>
      <Form>
        <form>
          <Name>
            <div>
              <label for="fname">
                <strong>First Name:</strong>
              </label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
              />
            </div>
            <div style={{ margin: "0px 50px" }}>
              <label for="lname">
                <strong>Last Name:</strong>
              </label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name.."
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
                value="State"
              />
              <label for="State">State</label>
            </div>
            <div style={{ margin: "0px 5px" }}>
              <input
                onClick={onClickCountry}
                type="radio"
                name="field"
                id="Country"
                value="Country"
              />
              <label for="Country">Country</label>
            </div>
          </Field>
          {state && (
            <select
              style={{ height: "30px", width: "300px" }}
              name="state"
              id="state"
                      >
                          
              {nameOfState}
              
            </select>
          )}
          <Resource>
            <label for="ResourceLink">
              <strong>Add Resource Link:</strong>
            </label>
            <input type="url" id="ResourceLink" name="ResourceLink"></input>
          </Resource>

          <input type="submit" value="Submit"></input>
        </form>
      </Form>
      <Detailed_resources></Detailed_resources>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px 40px 0px 40px;
  display:flex;
  justify-content:center;
 
`;
const Form = styled.div`
    min-width:800px;
  form {
    display: flex;
    flex-direction: column;
    border-right: 1px solid black;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 20px 10px 20px 0px rgba(16, 67, 212, 0.52);

    input {
      padding: 12px 20px;
      margin: 8px 10px;
      display: inline-block;
      border: 1px solid #ccc;
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
`;
const Resource=styled.div`

`;

const Field = styled.div`
display:flex;
align-items:center;
`;
const Detailed_resources = styled.div``;

export default Resources;

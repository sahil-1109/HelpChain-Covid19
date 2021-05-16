import React from "react";
import styled from "styled-components";
import numeral from "numeral";
function Table({ states }) {
  return (
    <Component>
      <tr>
        <td>
          <strong>STATE</strong>
        </td>
        <td>
          <strong>CASES</strong>
        </td>
      </tr>
      {states.map(({ state, cases }) => (
        <tr key={state+"1"}>
          <td>{state}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </Component>
  );
}

const Component = styled.div`
  background-color: white;
  grid-area: rightside;
  height: 400px;
  overflow-y: scroll;
  padding: 10px;
  border-radius: 20px;
  min-width: 300px;
  border-left: 1px solid black;
  box-shadow: 20px 10px 20px 0px rgba(16, 67, 212, 0.52);
  tr {
    display: flex;
    justify-content: space-between;
  }
  td {
    padding: 2px 10px;
  }
  tr:nth-of-type(odd) {
    background-color: rgba(16, 67, 212, 0.52);
    border-radius: 10px;
  }
`;

export default Table;

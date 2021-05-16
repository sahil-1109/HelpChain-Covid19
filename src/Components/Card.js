import React from "react";
import styled from "styled-components";

function Card(props) {
    
  return (
    <Container area={props.area}>
      <Title>{props.title}</Title>
      <NoOfCases title={props.title}>{props.dailyCases}</NoOfCases>
      <TotalCases>{props.totalCases}</TotalCases>
    </Container>
  );
}

const Container = styled.div`
  border-top: 1px solid black;
  padding: 20px;
  min-width:150px;
  border-radius: 20px;
  box-shadow: 20px 10px 20px 0px rgba(16, 67, 212, 0.52);
  grid-area: ${(props) => props.area};
`;
const Title =styled.div`
    font-size:30px;
    font-weight:500;
`;
const NoOfCases = styled.div`
  font-size: 28px;
  color: ${(props) =>
    props.title === "Cases"
      ? "blue"
      : props.title === "Recovered"
      ? "#32CD32"
      : "red"};
`;

const TotalCases = styled.div`

font-size:14px;

`;

export default Card;

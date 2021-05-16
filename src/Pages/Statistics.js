import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import Table from "../Components/Table";
import LineGraph from '../Components/LineGraph';
import { prettyPrintStat } from "../util";

function Statistics() {
  const [data, setData] = useState({});
  const [states, setStates] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/gov/IN")
        .then((response) => response.json())
        .then((data) => {
          const info = data.total;
          const states = data.states;
          // const DailyActiveCases=data.total.
          setData(info);
          setStates(states);
        });
    };
    getData();
  }, []);

  console.log(states);

  return (
    <Component>
      <Card
        area="leftside1"
        title="Cases"
        dailyCases={prettyPrintStat(data.todayCases)}
        totalCases={prettyPrintStat(data.cases)}
        red
      />
      <Card
        area="leftside2"
        title="Recovered"
        dailyCases={prettyPrintStat(data.todayRecovered)}
        totalCases={prettyPrintStat(data.recovered)}
      />
      <Card
        area="leftside3"
        title="Deaths"
        dailyCases={prettyPrintStat(data.todayDeaths)}
        totalCases={prettyPrintStat(data.deaths)}
      />
          <Table states={states} />
          
          <LineGraph casesType="deaths"/>
    </Component>
  );
}

const Component = styled.div`
  margin:40px 40px 0px 40px;
  display: grid;
  grid-template-areas: "leftside1 leftside2 leftside3 rightside" "map map map rightside" "map map map rightside" "map map map rightside";
  grid-gap: 20px;
`;

export default Statistics;

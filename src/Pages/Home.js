import React from 'react'
import styled from "styled-components";
function Home() {
    return (
        <Container>
            <Heading>HelpChain</Heading>
            <p3>HelpChain is a one-stop solution in such dfficult times when the world is struggling with COVID-19..Here, we at HelpChain provide you with PAN INDIA COVID-19 Resources so that we can reduce chaos in such disastourous times.</p3>

<h3>DONATE at HelpChain! </h3>
<p1>"Charity Begins at Home but should not end there"</p1>
<p>These are unsure times for all of us and many patients are not able to combat the virus due to financial restrictions. You can help by making contributions to this fight.</p>
<p2>WE ARE TOGETHER IN THIS FIGHT AND WE WILL FIGHT COVID-19 AS A UNITED FRONT!!
During such times, we will not let you lose your loved ones. 
Register Patients here so that the contributors can donate and save a precious life!!</p2>

        </Container>
    )
}
const Heading = styled.p`
  font-family: Righteous;
  color: rgba(16, 67, 212, 0.8);
  text-align: center;
  font-size: 3rem;
  border-bottom: 2px solid rgba(16, 67, 212, 0.8);
`;

const Container = styled.div`
font-family:Righteous;
  margin: auto;
  margin-top: 40px;
  margin-bottom:40px;
  display: flex;
  flex-direction: column;
  width: 800px;
  p{
      margin:30px;
  }
  p1{
    font-size:30px;
display:flex;
align-items:center;
justify-content:center;
color:rgba(16, 67, 212, 0.8);
  }
  h3{
font-size:30px;
display:flex;
align-items:center;
justify-content:center;
  }
  p2{
      margin:0px 30px;
  }
  p2:first-line{
    
    color:rgba(16, 67, 212, 0.8);
  }
  p3{
      margin:10px 30px;
  }
`;
export default Home

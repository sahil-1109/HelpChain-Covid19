import React from "react";
import styled from "styled-components";
import statImage from "../Assets/Images/signal-solid.svg";
import resImage from "../Assets/Images/database-solid.svg";
import helpImage from "../Assets/Images/hand-holding-medical-solid.svg";
import donateImage from "../Assets/Images/donate-solid.svg";
import {NavLink} from 'react-router-dom';
function Header() {
  return (
    <Container>
      <Logo>
        <NavLink to="/">Helpify</NavLink>
      </Logo>
      <Navbar>
        <NavListWrap>
          <Navlist>
            <NavLink to="/Statistics">
              <img src={statImage} alt="" />
              <span>Statistics</span>
            </NavLink>
          </Navlist>
          <Navlist>
            <NavLink to="/Resources">
              <img src={resImage} alt="" />
              <span>Resources</span>
            </NavLink>
          </Navlist>
          <Navlist>
            <NavLink to="/Donate">
              <img src={donateImage} alt="" />
              <span>Donate</span>
            </NavLink>
          </Navlist>
          <Navlist>
            <NavLink to="/Help">
              <img src={helpImage} alt="" />
              <span>Need Help</span>
            </NavLink>
          </Navlist>
        </NavListWrap>
      </Navbar>
    </Container>
  );
}

const Container = styled.div`
  height: 100px;
  width: 100%;
  border-bottom: 2px #f2f3f4 solid;
  margin: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  font-family: Righteous;
  font-size: 20px;
  font-weight: 400;
  margin: 40px;
  border: 1px white solid;
  padding: 20px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  color: rgba(16, 67, 212, 1);
  cursor: pointer;
  a {
    text-decoration: none;
  }
  a:visited{
    color: rgba(16, 67, 212, 1);
}
`;
const Navbar = styled.div`
  display: flex;
  margin-right:80px; 
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
`;

const Navlist = styled.li`
  display: flex;
  align-items: center;
  font-family: Righteous;
  background: transparent;
  padding: 10px;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    /* min-height: 52px;
    min-width: 80px; */
    position: relative;
    text-decoration: none;
    img {
      width: 30px;
      height: 30px;
    }
  }
  a:visited {
    color: rgba(16, 67, 212, 1);
  }
  a:hover {
    /* box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px; */
      border-bottom:2px solid rgba(16, 67, 212, 1);
  }
`;

export default Header;

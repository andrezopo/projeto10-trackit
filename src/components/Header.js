import styled from "styled-components";
import logo from "../assets/images/TrackIt.png";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";

function Header() {
  const stringifiedUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(stringifiedUserInfo);

  useEffect(() => {
    setImage(userInfo.image);
  }, []);

  const { image, setImage } = useContext(UserContext);
  const location = useLocation();
  function showHeader() {
    if (location.pathname !== "/" && location.pathname !== "/cadastro") {
      return (
        <>
          <StyledHeader>
            <img src={logo} alt="logo" />
            <img src={image} alt="user picture" />
          </StyledHeader>
        </>
      );
    } else {
      return null;
    }
  }
  const headerVisibility = showHeader();

  return headerVisibility;
}

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #4e8e57;

  img:nth-child(2) {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 25px;
  }
`;

export default Header;

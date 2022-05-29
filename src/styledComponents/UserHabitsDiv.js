import styled from "styled-components";

const UserHabitsDiv = styled.div`
  display: ${(props) => (props.display ? props.display : "initial")};
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 5px auto;
  & div:last-child > div {
    margin-top: 8px;
    margin-bottom: 15px;
  }
`;
export default UserHabitsDiv;

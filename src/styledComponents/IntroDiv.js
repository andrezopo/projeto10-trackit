import styled from "styled-components";

const IntroDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  width: 100%;
  padding: 30px 0px;
  font-size: 23px;
  line-height: 28px;
  color: #4e8e57;
  justify-content: space-between;
`;

export default IntroDiv;

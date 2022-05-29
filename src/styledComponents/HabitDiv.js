import styled from "styled-components";

const HabitDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
    line-height: 25px;
  }
  color: #666666;
  margin-top: 10px;
  & > div {
    font-size: 15px;
    ion-icon {
      margin-right: 3px;
      transform: translateY(-8px);
    }
  }
`;

export default HabitDiv;

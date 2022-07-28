import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  z-index: 6;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.75);
`;

export const PopUp = styled.div`
  width: 90%;
  max-width: 500px;
  @media (max-width: 768px) {
    width: 80%;
  }
  padding: 20px;

  background-color: ${({ theme }) => theme.background100};

  border-radius: 10px;
  border: 1px solid ${({ theme}) => theme.border100};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 0;
  }
  svg:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  input {
    display: none;
  }
`;

export const Spacer = styled.div`
  width: 70%;
  height: 0.2px;

  margin: 15px 0;

  background-color: ${({ theme }) => theme.text};
  opacity: 0.5;
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align:center;
  a {
    color: ${({ theme }) => theme.text};
  }

  input[type="radio"]:checked + label span {
    background-color:red;
    background-color: rgba(78, 116, 212, 0.7);
    box-shadow: 0 0 5px rgba(78, 116, 212, 0.4);
    color: white;
  }
`;

export const Option = styled.span`
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin: 0px 5px;
  border-radius: 3px;
  background-color: rgba(78, 116, 212, 0.2);
  display: inline-block;
  text-align:center;
  color: #ccc;
  
`
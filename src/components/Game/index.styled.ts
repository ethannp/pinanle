import styled from "styled-components";

export const Buttons = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: 'Noto Sans', sans-serif;
`;

export const Hint = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.gray};
  text-align: center;

  #toggleSpoiler {
    display: none;
  }

  #toggleSpoiler:checked + label > span {
    color: white;
    background-color: ${({ theme }) => theme.background100};
  }
  span {
    background-color: black;
    color: black;
    text-align: center;
    width: 250px;
    display:inline-block;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: 5px;
    border-radius: 2px;
    transition: color 0.5s, background-color 0.5s;
  }
`
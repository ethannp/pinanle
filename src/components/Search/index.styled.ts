import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  width: 100%;

  margin-top: 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 44px;

  border-color: ${({ theme }) => theme.accent};
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;

  color: ${({ theme }) => theme.text};
`;

export const SearchPadding = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 0 15px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  margin: 0 10px;

  background-color: transparent;
  border: none;
  outline: none !important;

  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;

export const ResultsContainer = styled.div`
  position: absolute;
  bottom: 53px;
  z-index: 5;

  background-color: ${({ theme }) => theme.background100};
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.accent};

  right: -0.5%;

  width: 100.5%;
  max-height: 259px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    height: 12px;
    width: 12px;
    background: #3e3e3e;
    border-radius: 1ex;
  }

  &::-webkit-scrollbar-thumb {
    background: #666;
    -webkit-border-radius: 1ex;
    width: 5px;
  }
`;

export const Result = styled.div`
  padding: 1px 15px;

  background-color: ${({ theme }) => theme.background100};

  border-color: ${({ theme }) => theme.border};
  border-width: 1px;
  border-style: none none solid none;

  color: ${({ theme }) => theme.text};

  cursor: pointer;
  &:hover {
    background-color: #252525;
  }
`;

export const ResultText = styled.p`
  width: 100%;

  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  margin: 9px 0px;
  user-select: none;
`;

export const ResultsInfo = styled.p`
  margin:0;
  padding:5px 10px;
  border-bottom: 1px solid white;
  position:sticky;
  top: 0;
  background-color: ${({ theme }) => theme.background100};
  color: ${({ theme }) => theme.gray};
  font-size: 14px;
`

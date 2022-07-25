import styled from "styled-components";

export const ProgressBackground = styled.div`
  position: relative;
  z-index: 4;

  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.background100};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.accent};
  margin-top: 3%;
`;

export const AvailableBar = styled.div<{ value: number }>`
  width: ${({ value }) => (value / 16000) * 100}%;
  background-color: #333;
  border-radius: 2px 0px 0px 2px;
  height: 20px;
  position:absolute;
  z-index: 1;
  align-self: flex-start;
`

export const Progress = styled.div<{ value: number }>`
  width: ${({ value }) => value * 6.25}%;
  height: 20px;
  position: absolute;
  align-self: flex-start;

  background-color: ${({ theme }) => theme.accent};
  z-index: 2;
  border-radius: 1px;

  transition: width 0.4s;
`;

export const Separator = styled.div`
  position: absolute;
  top: 0;

  width: 0.8px;
  height: 100%;
  z-index: 2;

  background-color: ${({ theme }) => theme.accent};
`;

export const TimeStamps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
`;

export const TimeStamp = styled.p`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0px;
  margin-top: 3px;
`;

export const PlayButton = styled.span`
  svg {
    position: relative;
    top: -15px;
  }
  svg:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
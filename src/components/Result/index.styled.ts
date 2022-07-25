import styled from "styled-components";

export const ResultTitle = styled.p`
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px
  }
  text-align: center;
  margin-top: 60px;
  font-size: 24px;
`;

export const Tries = styled.p`
  @media (max-width: 768px) {
    width: 100%;
  }
  text-align: center;
  margin-top: 0;
`;

export const SongTitle = styled.p`
  @media (max-width: 768px) {
    width: 100%;
  }
  text-align: center;
  margin-top: 0;
  font-family: "Noto Sans"
`;

export const TimeToNext = styled.p`
  @media (max-width: 768px) {
    width: 100%;
  }
  text-align: center;
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.gray};
  margin-top: 9px;
`
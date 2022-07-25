import styled from "styled-components";

export const Container = styled.div<{
  active: boolean;
  isCorrect: boolean | undefined;
}>`
  width: 100%;
  min-height: 36px;

  margin: 5px auto;

  display: flex;
  align-items: center;

  border-color: ${({ theme, active, isCorrect }) => {
    if (active) {
      return theme.border;
    } else if (isCorrect === false) {
      return theme.red;
    } else {
      return theme.border100;
    }
  }};
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;

  color: ${({ theme }) => theme.text};
`;

export const Text = styled.p`
  width: 100%;
  height: max-content;
  margin: 8px 0px;
  padding: 0px 10px;
  font-size: 0.9rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  color: ${({ theme }) => theme.text};
`;

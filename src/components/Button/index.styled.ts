import styled from "styled-components";
import { theme } from "../../constants";

export const Button = styled.button<{ variant?: keyof typeof theme }>`
  background-color: ${({ theme, variant }) =>
    variant ? theme[variant] : theme.background100};
  font-family: 'Noto Sans', sans-serif;
  border-radius: 2px;
  border: none;

  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 800;

  width: max-content;
  padding: 10px 20px;

  &:hover {
    opacity: 0.8;
  }

  cursor: pointer;
`;

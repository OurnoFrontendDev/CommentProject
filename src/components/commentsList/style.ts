import { styled } from 'styled-components';
import { VariableSizeList as List } from 'react-window';

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  gap: 20px;
  padding: 10px 0;
  min-width: 596px;
`;

export const StyledList = styled(List)`
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00bfff;
    border-radius: 20px;
    border: 3px solid #00bfff;
  }
`;
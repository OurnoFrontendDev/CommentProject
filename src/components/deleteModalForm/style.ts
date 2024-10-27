import { styled } from 'styled-components';
import { AddCommentButton } from '../commentsForm/styled';

export const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  height: 162px;
  width: 500px;
  gap: 50px;
`;
export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const DeleteModalText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DeleteModalButton = styled(AddCommentButton)``;

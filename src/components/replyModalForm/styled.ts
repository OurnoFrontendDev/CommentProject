import { styled } from 'styled-components';
import { AddCommentButton } from '../commentsForm/styled';

export const ModalForm = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;
`;

export const ModalContent = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  height: 300px;
  width: 500px;
`;
export const ReplyModalTextArea = styled.textarea`
  width: 100%;
  border: none;
  height: 200px;
  resize: none;
  outline: none;
  padding: 10px;

  &:focus {
    border: 1px solid #00bfff;
    border-radius: 20px;
    outline: none;
  }
`;
export const ReplyCommentAddContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const ReplyCommentAdd = styled(AddCommentButton)``;

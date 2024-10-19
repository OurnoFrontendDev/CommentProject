import { styled } from 'styled-components';
import { VariableSizeList as List } from 'react-window';
import { IconContainerProps } from '../../types';

export const IconContainer = styled('div').withConfig({
  shouldForwardProp: (prop) => !['withFrameButtonGroup'].includes(prop),
})<IconContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  border: ${({ withFrameButtonGroup }) =>
    withFrameButtonGroup ? '1px solid #00bfff' : 'none'};
  border-radius: 0 0 8px 8px;
  border-top: none;
  gap: 7px;
  padding: 6px;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 628px;
`;
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
export const Header = styled.h2`
  display: inline-flex;
  min-width: 596px;
  font-size: 26px;
  line-height: 35px;
  font-weight: var(--font-weight-text-large);
  text-align: start;
  justify-self: start;
`;

export const CommentContentContainer = styled.div<{ $parentId?: string }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: ${(props) => (props.$parentId === null ? '0' : '6px 0 16px 14px')};
`;

export const CommentItemAvNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: var(--border-for-comment-element);
  border-radius: 8px 8px 0 0;
  border-bottom: none;
  padding: 6px;
`;
export const CommentForm = styled.div<{ $parentId?: string }>`
  width: 100%;
  padding: 10px;
  border: none;
  border-right: var(--border-for-comment-element);
  border-left: var(--border-for-comment-element);
  height: fit-content;
  color: ${(props) => (props.$parentId === null ? 'black' : 'grey')};
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const IconButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => (props.disabled ? 'gray' : '#0e7cdd')};

  &:hover {
    color: #000;
  }
`;

export const FormContainer = styled.div`
  border: 1px solid #00bfff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  min-width: 596px;
  height: 259px;
`;
export const Username = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-text-large);
  line-height: 23px;
  color: #333;
`;
export const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 3px;
  border: none;
  min-height: 85px;
  border-radius: 4px;
  resize: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 27px;
  font-family: 'Source Sans Pro', sans-serif;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(128, 128, 128, 0.6);
  padding: 16px 0 0 0;
`;
export const AddCommentButton = styled.button<{ disabled?: boolean }>`
  padding: 15px 26px;
  background-color: ${(props) => (props.disabled ? 'gray' : '#0e7cdd')};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
`;

export const CommentFormAvNameContainer = styled.div`
  display: flex;
  align-items: center;
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

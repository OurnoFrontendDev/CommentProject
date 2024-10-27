import { styled } from 'styled-components';
import { IconContainerProps } from '../../../types/iconContainer';

export const CommentContentContainer = styled.div<{ $parentId?: string }>`
  display: flex;
  width:${(props) => (props.$parentId === null ? '620' : '100%')};    
  flex-direction: column;
  padding: ${(props) => (props.$parentId === null ? '0' : '6px 5px 16px 14px')};
`;

export const CommentAvatarAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: var(--border-for-comment-element);
  border-radius: 8px 8px 0 0;
  border-bottom: none;
  padding: 6px;
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

export const IconButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size:24px;
  color: ${(props) => (props.disabled ? 'gray' : '#0e7cdd')};

  &:hover {
    color: ${(props) => (props.disabled ? 'gray' : 'black')};
  }
`;

export const IconContainer = styled('div').withConfig({
  shouldForwardProp: (prop) => !['buttonGroupWithBorder'].includes(prop),
})<IconContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  border: ${({ buttonGroupWithBorder }) =>
    buttonGroupWithBorder ? '1px solid #00bfff' : 'none'};
  border-radius: 0 0 8px 8px;
  border-top: none;
  gap: 7px;
  padding: 6px;
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;


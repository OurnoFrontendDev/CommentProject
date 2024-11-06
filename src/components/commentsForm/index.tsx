import React, { useCallback, useState } from 'react';
import { useAddCommentMutation } from '../../api/commentApi';
import { AiOutlineBold, AiOutlineItalic, AiOutlineLink } from 'react-icons/ai';
import {
  AddCommentButton,
  ButtonsContainer,
  FormContainer,
  TextArea,
  Username,
} from './styled';
import {
  IconContainer,
  IconButton,
  CommentAuthor,
} from '../commentWithReplies/styled';
import { iconLoader } from '../iconLoader';

export interface CommentFormProps {
  parentId?: number | null;
  username: string;
  initialContent?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  username,
  initialContent,
}) => {
  const [addComment] = useAddCommentMutation();

  const [content, setContent] = useState(initialContent || '');

  const isDisabledAddCommentBtn = content.length === 0;

  const handleTextFormatClick = (tag: string) => {
    const newText = `${tag}${content}${tag}`;
    setContent(newText);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (content) {
        const newComment = {
          content,
          parentId: parentId || null,
          userId: 1,
          avatarUrl:
            'https://wh40k.lexicanum.com/mediawiki/images/thumb/7/72/SangTerra.jpg/370px-SangTerra.jpg',
          username: username,
          createdAt: new Date().toISOString(),
          like: 0,
          dislike: 0,
        };

        try {
          await addComment(newComment);
          setContent('');
        } catch (error) {
          console.error('Failed to add comment', error);
        }
      }
    },
    [content, addComment, parentId, username],
  );

  return (
    <FormContainer>
      <CommentAuthor>
        <iconLoader
          src={
            'https://wh40k.lexicanum.com/mediawiki/images/thumb/7/72/SangTerra.jpg/370px-SangTerra.jpg'
          }
          width={40}
          height={40}
          borderRadius={20}
        />
        <Username>{'John Doe'}</Username>
      </CommentAuthor>
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Comment"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          required
        />
        <ButtonsContainer>
          <IconContainer buttonGroupWithBorder={false}>
            <IconButton
              title="Bold"
              onClick={() => handleTextFormatClick('**')}
              disabled={isDisabledAddCommentBtn}
            >
              <AiOutlineBold />
            </IconButton>
            <IconButton
              title="Italic"
              onClick={() => handleTextFormatClick('*')}
              disabled={isDisabledAddCommentBtn}
            >
              <AiOutlineItalic />
            </IconButton>
            <IconButton disabled={isDisabledAddCommentBtn} title="Link">
              <AiOutlineLink />
            </IconButton>
          </IconContainer>
          <AddCommentButton type="submit" disabled={isDisabledAddCommentBtn}>
            Comment
          </AddCommentButton>
        </ButtonsContainer>
      </form>
    </FormContainer>
  );
};

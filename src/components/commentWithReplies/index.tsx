import React, { useCallback, useState } from 'react';
import { ReplyModalForm } from '../replyModalForm';
import { FaReplyd, FaTrash } from 'react-icons/fa';
import { FcLike, FcDislike } from 'react-icons/fc';
import ReactMarkdown from 'react-markdown';
import {
  useLikeCommentMutation,
  useDislikeCommentMutation,
} from '../../api/commentApi';
import {
  CommentContentContainer,
  CommentAvatarAuthor,
  CommentForm,
  IconButton,
  IconContainer,
  UserName,
} from './styled';
import { IComments } from '../../../types/comments';
import { Icon } from '../svgLoader';
import { DeleteModalForm } from '../deleteModalForm';
import { timeAgo } from '../../utils/format/date';

const REPLY_ICON_SIZE = 20;
const REPLY_ICON_COLOR = '#00bfff';

type CommentWithRepliesProps = {
  dislike: number;
  like: number;
  comment: IComments;
  getReplies: (parentId: string | null) => IComments[];
  replies: IComments[];
  onDelete: (id: string) => void;
};

export const CommentWithReplies: React.FC<CommentWithRepliesProps> = ({
  dislike,
  like,
  comment,
  getReplies,
  replies,
  onDelete,
}) => {
  const [likeComment] = useLikeCommentMutation();
  const [disLikeComment] = useDislikeCommentMutation();

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const handleLike = useCallback(async () => {
    const NewValueLike = like === 1 ? 0 : 1;
    try {
      await likeComment({
        id: comment.id,
        like: NewValueLike,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при лайке:', error);
    }
  }, [comment.id, like]);

  const handleDisLike = async () => {
    const newValueDisLike = dislike === 1 ? 0 : 1;
    try {
      await disLikeComment({
        id: comment.id,
        dislike: newValueDisLike,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при дизлайке:', error);
    }
  };

  const handleReplyFormClose = useCallback(() => {
    setShowReplyForm(false);
  }, []);

  const handleDeleteFormClose = useCallback(() => {
    setShowDeleteForm(false);
  }, []);
  return (
    <CommentContentContainer>
      <CommentAvatarAuthor>
        {comment.username === 'John Doe' ? (
          <Icon
            src={
              'https://wh40k.lexicanum.com/mediawiki/images/thumb/7/72/SangTerra.jpg/370px-SangTerra.jpg'
            }
            width={40}
            height={40}
            borderRadius={20}
          />
        ) : (
          <Icon
            src={
              'https://cdn.freelance.ru/img/portfolio/pics/00/39/C4/3785853.jpg?mt=b3245cbd'
            }
            width={40}
            height={40}
            borderRadius={20}
          />
        )}
        <UserName>{comment.username}</UserName>
      </CommentAvatarAuthor>
      <CommentForm $parentId={comment.parentId}>
        <ReactMarkdown>{comment.content}</ReactMarkdown>
      </CommentForm>
      <IconContainer buttonGroupWithBorder={true}>
        <IconButton onClick={handleLike} disabled={dislike > 0}>
          {like}
          <FcLike size={REPLY_ICON_SIZE} />
        </IconButton>
        <IconButton onClick={handleDisLike} disabled={like > 0}>
          <FcDislike size={REPLY_ICON_SIZE} />
          {dislike}
        </IconButton>
        <IconButton onClick={() => setShowReplyForm((prev) => !prev)}>
          <FaReplyd size={REPLY_ICON_SIZE} color={REPLY_ICON_COLOR} />
        </IconButton>
        <IconButton onClick={() => setShowDeleteForm((prev) => !prev)}>
          <FaTrash size={REPLY_ICON_SIZE} color={REPLY_ICON_COLOR} />
        </IconButton>
        <div>{timeAgo(comment.createdAt)}</div>
      </IconContainer>

      {showReplyForm && (
        <ReplyModalForm parentId={comment.id} onClose={handleReplyFormClose} />
      )}
      {showDeleteForm && (
        <DeleteModalForm
          onDelete={onDelete}
          id={comment.id}
          onClose={handleDeleteFormClose}
        />
      )}

      {replies.map((reply) => (
        <CommentWithReplies
          key={reply.id}
          comment={reply}
          {...reply}
          replies={getReplies(reply.id)}
          onDelete={onDelete}
          getReplies={getReplies}
        />
      ))}
    </CommentContentContainer>
  );
};

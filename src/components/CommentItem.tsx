import React, { useCallback, useMemo, useState } from 'react';
import { IComments } from 'src/models/IComments';
import { ReplyModalForm } from './ReplyForm';
import { FaReplyd, FaTrash } from 'react-icons/fa';
import { FcLike, FcDislike } from 'react-icons/fc';
import {
  useLikeCommentMutation,
  useDislikeCommentMutation,
} from '../api/commentApi';
import {
  CommentContentContainer,
  CommentItemAvNameContainer,
  CommentForm,
  Avatar,
  IconButton,
  IconContainer,
  UserName,
} from './styledComponents/StyledComponents';
import { timeAgo } from '../utils/timeAgo';

const sizeIcon = 20;
const iconColor = '#00bfff';

export const CommentItem: React.FC<{
  dislike: number;
  like: number;
  comment: IComments;
  getReplies: (parentId: string | null) => IComments[];
  replies: IComments[];
  onDelete: (id: string) => void;
}> = ({ comment, replies, onDelete, like, dislike, getReplies }) => {
  const [likeComment] = useLikeCommentMutation();
  const [disLikeComment] = useDislikeCommentMutation();

  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleLike = useCallback(async () => {
    const Like = like === 1 ? 0 : 1;
    try {
      await likeComment({
        id: comment.id,
        like: Like,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при лайке:', error);
    }
  }, [comment.id, like]);

  const handleDisLike = useCallback(async () => {
    const newDisLike = dislike === 1 ? 0 : 1;
    try {
      await disLikeComment({
        id: comment.id,
        dislike: newDisLike,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при дизлайке:', error);
    }
  }, [comment.id, dislike]);

  const handleDelete = useCallback(() => {
    if (window.confirm('Уверены, что хотите удалить?')) {
      onDelete(comment.id);
    }
  }, [comment.id]);

  const avatarSrc = useMemo(
    () =>
      comment.username === 'John Doe' ? '/img/avatar1.jpg' : '/img/avatar2.jpg',
    [comment.username],
  );

  const handleReplyFormClose = useCallback(() => {
    setShowReplyForm(false);
  }, []);
  return (
    <CommentContentContainer>
      <CommentItemAvNameContainer>
        <Avatar src={avatarSrc} alt={'Bra'}></Avatar>
        <UserName>{comment.username}</UserName>
      </CommentItemAvNameContainer>
      <CommentForm
        $parentId={comment.parentId}
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <IconContainer withFrameButtonGroup={true}>
        <IconButton onClick={handleLike}>
          {like}
          <FcLike size={sizeIcon} />
        </IconButton>
        <IconButton onClick={handleDisLike}>
          <FcDislike size={sizeIcon} />
          {dislike}
        </IconButton>
        <IconButton onClick={() => setShowReplyForm(!showReplyForm)}>
          <FaReplyd size={sizeIcon} color={iconColor} />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <FaTrash size={sizeIcon} color={iconColor} />
        </IconButton>
        <div>{timeAgo(comment.createdAt)}</div>
      </IconContainer>

      {showReplyForm && (
        <ReplyModalForm parentId={comment.id} onClose={handleReplyFormClose} />
      )}

      {replies.map((reply) => (
        <CommentItem
          key={reply.id}
          like={reply.like}
          dislike={reply.dislike}
          comment={reply}
          replies={getReplies(reply.id)}
          onDelete={onDelete}
          getReplies={getReplies}
        />
      ))}
    </CommentContentContainer>
  );
};

export const MemoizedCommentItem = React.memo(CommentItem);

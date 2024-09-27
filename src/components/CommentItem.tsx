import React, { useState } from 'react';
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
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likeComment] = useLikeCommentMutation();
  const [disLikeComment] = useDislikeCommentMutation();

  const handleLike = async () => {
    try {
      await likeComment({
        id: comment.id,
        like: like + 1,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при лайке:', error);
    }
  };

  const handleDisLike = async () => {
    try {
      await disLikeComment({
        id: comment.id,
        dislike: dislike + 1,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при дизлайке:', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Уверены, что хотите удалить?')) {
      onDelete(comment.id);
    }
  };
  const avatarSrc =
    comment.username === 'John Doe' ? '/img/avatar1.jpg' : '/img/avatar2.jpg';

  const handleReplyFormClose = () => {
    setShowReplyForm(false);
  };

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
      <IconContainer>
        <IconButton onClick={handleLike}>
          {like}
          <FcLike size={sizeIcon} />
        </IconButton>
        <IconButton>
          <FcDislike size={sizeIcon} onClick={handleDisLike} />
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
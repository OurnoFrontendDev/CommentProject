import React, { CSSProperties, useEffect, useRef } from 'react';
import { CommentWithReplies } from '../commentWithReplies';
import { CommentWrapper } from '../commentsList/style';
import { IComments } from '../../../types/comments';

interface CommentItemProps {
  index: number;
  style: CSSProperties;
  comment: IComments;
  replies: IComments[];
  onDelete: (id: string) => Promise<void>;
  setItemSize: (index: number, size: number) => void;
  getReplies: (parentId: string | null) => IComments[];
}

const RenderingCommentItem: React.FC<CommentItemProps> = ({
  index,
  style,
  comment,
  replies,
  onDelete,
  setItemSize,
  getReplies,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;
      setItemSize(index, height);
    }
  }, [index, setItemSize]);

  return (
    <div style={{ ...style, width: '100%' }}>
      <CommentWrapper ref={ref}>
        <CommentWithReplies
          dislike={comment.dislike}
          like={comment.like}
          comment={comment}
          replies={replies}
          onDelete={onDelete}
          getReplies={getReplies}
        />
      </CommentWrapper>
    </div>
  );
};

export default RenderingCommentItem;

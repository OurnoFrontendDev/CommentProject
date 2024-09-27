import React, { useCallback, useEffect, useRef } from 'react';
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from '../api/commentApi';
import { CommentItem } from './CommentItem';
import { VariableSizeList as List } from 'react-window';
import {
  CommentContainer,
  StyledList,
} from './styledComponents/StyledComponents';

export const CommentsList = () => {
  const { data: comments } = useGetCommentsQuery('');
  const [deleteComment] = useDeleteCommentMutation();

  const itemsHeights = useRef<Record<number, number>>({});
  const virtualList = useRef<List>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
    }
  };

  const getReplies = (parentId: string | null) => {
    return comments?.filter((comment) => comment.parentId === parentId) || [];
  };

  const getDialogItemSize = (index: number) =>
    itemsHeights.current[index] || 200;

  const setDialogItemSize = useCallback(
    (index: number, size: number) => {
      itemsHeights.current = {
        ...itemsHeights.current,
        [index]: size,
      };

      if (virtualList.current) {
        virtualList.current.resetAfterIndex(index);
      }
    },
    [itemsHeights],
  );

  const parentComments =
    comments?.filter((comment) => comment.parentId === null) || [];

  const Row: React.FC<{ index: number; style: object }> = ({
    index,
    style,
  }) => {
    const comment = parentComments[index];
    const newStyle = { ...style, width: '100%' };
    const replies = getReplies(comment.id);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref.current) {
        const height = ref.current.getBoundingClientRect().height;
        setDialogItemSize(index, height);
      }
    }, [index, setDialogItemSize]);

    return (
      <div style={newStyle} key={comment.id}>
        <CommentContainer ref={ref}>
          <CommentItem
            dislike={comment.dislike}
            like={comment.like}
            comment={comment}
            replies={replies}
            onDelete={handleDelete}
            getReplies={getReplies}
          />
        </CommentContainer>
      </div>
    );
  };
  return (
    <StyledList
      height={550}
      itemCount={parentComments.length}
      itemSize={getDialogItemSize}
      width={700}
      ref={virtualList}
    >
      {Row}
    </StyledList>
  );
};

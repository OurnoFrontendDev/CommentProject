import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from '../../api/commentApi';
import { VariableSizeList as List } from 'react-window';
import { StyledList } from './style';
import RenderingCommentItem from '../renderingCommentItem';

export const CommentsList = () => {
  const { data: comments } = useGetCommentsQuery('');
  const [deleteComment] = useDeleteCommentMutation();

  const commentsHeights = useRef<Record<number, number>>({});
  const virtualList = useRef<List>(null);

  const handleDeleteComments = useCallback(
    async (id: string) => {
      try {
        await deleteComment(id).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
      }
    },
    [deleteComment],
  );

  const getReplies = (parentId: string | null) => {
    return (comments || []).filter((comment) => comment.parentId === parentId);
  };

  const getDialogItemSize = (index: number) =>
    commentsHeights.current[index] || 200;

  const setDialogItemSize = useCallback((index: number, size: number) => {
    commentsHeights.current[index] = size;
    if (virtualList.current) {
      virtualList.current.resetAfterIndex(index);
    }
  }, []);

  const parentComments = useMemo(
    () => comments?.filter((comment) => comment.parentId === null) || [],
    [comments],
  );

  useEffect(() => {
    if (virtualList.current && parentComments.length) {
      virtualList.current.scrollToItem(parentComments.length - 1);
    }
  }, [parentComments.length]);

  return (
    <StyledList
      height={550}
      itemCount={parentComments.length}
      itemSize={getDialogItemSize}
      width={631}
      ref={virtualList}
    >
      {({ index, style }: { index: number; style: CSSProperties }) => (
        <RenderingCommentItem
          index={index}
          style={style}
          comment={parentComments[index]}
          replies={getReplies(parentComments[index].id)}
          onDelete={handleDeleteComments}
          setItemSize={setDialogItemSize}
          getReplies={getReplies}
        />
      )}
    </StyledList>
  );
};

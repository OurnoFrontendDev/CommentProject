import React, { useRef, useState } from 'react';
import { useReplyCommentMutation } from '../../api/commentApi';
import { usePortal } from '../../hooks/usePortal';
import { createPortal } from 'react-dom';
import {
  ModalContent,
  ModalForm,
  ReplyCommentAdd,
  ReplyCommentAddContainer,
  ReplyModalTextArea,
} from './styled';
import useClickOutside from '../../hooks/useClickOutside';

interface ReplyFormProps {
  parentId: string;
  onClose: () => void;
}

export const ReplyModalForm: React.FC<ReplyFormProps> = ({
  parentId,
  onClose,
}) => {
  const [content, setContent] = useState('');

  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);

  const [addReplyComment] = useReplyCommentMutation();

  const isDisabledReplyCommentBtn = content.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReplyComment({
      parentId: parentId,
      content,
      username: 'Jane Doe',
      avatar: '/icons/default-avatar.jpg',
      userId: null,
    });
    setContent('');
    onClose();
  };
  const portalAddReplyModal = usePortal('ReplyModalForm');
  return createPortal(
    <ModalForm>
      <ModalContent ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <ReplyModalTextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add new reply"
          />
          <ReplyCommentAddContainer>
            <ReplyCommentAdd type="submit" disabled={isDisabledReplyCommentBtn}>
              Ответить
            </ReplyCommentAdd>
          </ReplyCommentAddContainer>
        </form>
      </ModalContent>
    </ModalForm>,
    portalAddReplyModal,
  );
};

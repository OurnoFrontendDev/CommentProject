import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import useClickOutside from '../../hooks/useClickOutside';
import { usePortal } from '../../hooks/usePortal';
import { ModalForm } from '../replyModalForm/styled';
import {
  DeleteButtonContainer,
  DeleteModalButton,
  DeleteModalContent,
  DeleteModalText,
} from './style';

interface DeleteModalForm {
  id: string;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const DeleteModalForm: React.FC<DeleteModalForm> = ({
  id,
  onClose,
  onDelete,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);

  const closeModalHandler = () => {
    onClose();
  };
  const deleteCommentModalHandler = () => {
    onDelete(id);
  };
  const portalAddReplyModal = usePortal('DeleteModalForm');
  return createPortal(
    <ModalForm>
      <DeleteModalContent ref={modalRef}>
        <DeleteModalText>
          Вы уверены, что хотите удалить комментарий?
        </DeleteModalText>
        <DeleteButtonContainer>
          <DeleteModalButton onClick={closeModalHandler}>
            Отмена
          </DeleteModalButton>
          <DeleteModalButton onClick={deleteCommentModalHandler}>
            Удалить
          </DeleteModalButton>
        </DeleteButtonContainer>
      </DeleteModalContent>
    </ModalForm>,
    portalAddReplyModal,
  );
};

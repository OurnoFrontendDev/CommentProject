import { styled } from 'styled-components';

export const FormContainer = styled.div`
  border: 1px solid #00bfff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  min-width: 596px;
  height: 259px;
`;

export const Username = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-text-large);
  line-height: 23px;
  color: #333;
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 3px;
  border: none;
  min-height: 85px;
  border-radius: 4px;
  resize: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 27px;
  font-family: 'Source Sans Pro', sans-serif;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(128, 128, 128, 0.6);
  padding: 16px 0 0 0;
`;

export const AddCommentButton = styled.button<{ disabled?: boolean }>`
  padding: 15px 26px;
  background-color: ${(props) => (props.disabled ? 'gray' : '#0e7cdd')};
  color: white;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 8px;

  &:hover {
    color: ${(props) => (props.disabled ? 'white' : 'black')};
  }
`;

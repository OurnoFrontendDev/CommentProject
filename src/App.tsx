import React from 'react';
import { styled } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { CommentsList } from './components/CommentsList';
import { CommentForm } from './components/CommentsForm';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 40px;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  padding: 10px 20px;
`;
const Header = styled.h2`
  display: inline-flex;
  width: 100%;
  margin-bottom: 10px;
  text-align: start;
  justify-self: start;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <CommentContainer>
          <Header>Comments</Header>
          <CommentForm avatar={'/img/avatar1.jpg'} username={'John Doe'} />
          <CommentsList />
        </CommentContainer>
      </AppContainer>
    </>
  );
};

export default App;

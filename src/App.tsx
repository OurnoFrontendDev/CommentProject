import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import { CommentsList } from './components/commentsList';
import { CommentForm } from './components/commentsForm';
import { styled } from 'styled-components';
import { CommentWrapper } from './components/commentsList/style';
import { Header } from './components/header/style';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 628px;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <CommentWrapper>
          <Header>Comments</Header>
          <CommentForm username={'John Doe'} />
          <CommentsList />
        </CommentWrapper>
      </AppContainer>
    </>
  );
};

export default App;

import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import Activity from '../components/Activity';
import styled from 'styled-components';

const _Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 480px;
  margin: 0 auto;
  padding: 0 30px 65px;
  font-family: 'GTWalsheim',Georgia,serif;

`;

export default (props) => {
  return (
    <_Main>
        <Route exact path="/" component={Home} />
        <Route exact path="/activity" component={Activity} />
    </_Main>
  )
}

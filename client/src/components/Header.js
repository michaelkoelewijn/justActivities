import React from 'react';
import styled from 'styled-components';

const _Header = styled.header`
    padding: 0.5em 0;
    margin: 0 0 0.5em;
    border-bottom: 1px solid #000;
    text-align: center;
    font-size: 3em;
    font-weight: bold;
`;

export default (props) => {
    return (
        <_Header>
            JustActivities
        </_Header>
    )
}
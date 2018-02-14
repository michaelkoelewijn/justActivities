import React from 'react';
import styled from 'styled-components';

const _formInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 0 15px;
    label {
        display: block;
        flex: 1;
        max-width: 170px;        
    }

    select
    {
        display: block;
        flex: 1;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 0.75em 1em;
        border: 1px solid #ddd;
    }
`;

export default (props) => {
    return (
        <_formInput>
            { props.children }
        </_formInput>
    )
}
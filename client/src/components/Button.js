import React from 'react';
import styled, {css} from 'styled-components';

const _Button = styled.button`
    border: 0;
    background-color: #000;
    color: #FFF;
    padding: 0.5em 1em;
    font-size: 1.25em;
    
    ${props => props.fixedToBottom && css`
        margin: 15vh 0 0;
        width: 100%;
        padding: 1em 1em;
        text-transform: uppercase;
    `}

    ${props => props.xxl && css`
        padding: 3em 1em;
    `}
`

export default class Button extends React.Component {
    render() {

        if(this.props.hasOwnProperty('fixedToBottom')) {
            let style = {
                marginLeft: '-30px',
                marginRight: '-30px'
            }
            return (
                <div style={style}>
                    <_Button {...this.props} >{this.props.title}</_Button>
                </div>    
            )
        }

        return (
            <_Button {...this.props} >{this.props.title}</_Button>
        )
    }
}
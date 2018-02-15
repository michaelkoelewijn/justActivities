import React from "react";
import styled from 'styled-components';
import Button from './Button';


const jsTimer = require('easytimer.js');

const _Timer = styled.div`
    font-size: 5em;
    color: red;
`;

export default class Timer extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: false
        }
    }

    componentDidMount() {
        this.timer = new jsTimer();
        setTimeout(() => {
            this.timer.start({
                precision: 'secondTenths',
                startValues: { seconds: 0 }
            });
            this.props.onStart(); //Callback

        }, this.props.startAfter);
        
        this.timer.addEventListener('secondTenthsUpdated', (e) => {
            this.timerEl.innerHTML = this.timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
        });   
    }

    stop() {
        this.setState({
            disabled: true
        })
        this.timer.pause();
        this.props.onStop(this.timer.getTotalTimeValues());
    }

    render() {
        return (
            <React.Fragment>
                <_Timer>
                    <div ref={(el) => this.timerEl = el}></div>
                </_Timer>

                <Button disabled={this.state.disabled} onClick={this.stop.bind(this)} title="Stop, i'm weak!" fixedToBottom />
            </React.Fragment>
        )
    }
}

import React, {Component} from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import Header from "../components/Header";
import Attendance from "../components/Attendance";
import CaptureVideo from "../components/CaptureVideo";
import {Button, Col, Row} from "antd";

class App extends Component {
    state = {
        visible: true
    };

    render() {
        const buttonText = this.state.visible ? "Quit" : "Take Image";
        const videoToggle = this.state.visible ? <CaptureVideo/> : null;
        return (
            <div className="App">
                <Header/>
                <Attendance/>
                {videoToggle}
                <Row>
                    <Col xs={{span: 5, offset: 1}} lg={{span: 4, offset: 1}}>
                        <Button type="primary" onClick={() => {
                            this.setState({visible: !this.state.visible});
                        }}>{buttonText}</Button>
                    </Col>
                    <Col xs={{span: 11, offset: 1}} lg={{span: 4, offset: 1}}>
                        <Button type="secondary">Train image</Button>
                    </Col>
                    <Col xs={{span: 5, offset: 1}} lg={{span: 4, offset: 1}}>
                        <Button ghost type="primary">Track image</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App;

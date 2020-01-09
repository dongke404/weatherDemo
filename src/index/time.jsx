import React, { Component } from 'react'
import { formateDate } from '../utils/dateUtils';


export default class Time extends Component {
    state = {
        currentTime: formateDate(Date.now()),
    }
    componentDidMount() {
        //启动循环定时器
        this.intervalId = setInterval(() => {
            // 将currentTime更新为当前时间值
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);
    }
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }
    render() {
        const { currentTime } = this.state
        return (
            <div>
                <span style={{ fontWeight: 'bold' }}>时间：{currentTime}</span>
            </div>
        )
    }
}

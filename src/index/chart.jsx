import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'


export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option:{}
        }
    }
    
    UNSAFE_componentWillReceiveProps(props) {
        if (props.data.length===0) {
            return
        }
        this.getoption(props.data)
    }

    getoption = (datasource) => {
        const option = {
            title: {
                text: '天气趋势'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: datasource.map(item => item.city)
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,

                data: datasource[0].casts.map(item => item.date)
            },
            yAxis: {
                type: 'value',
                name: '气温°C',
                nameTextStyle: {
                    fontSize: 16,
                    color: "#61a0a8"
                }
            },
            series: datasource.map((item) => {
                return {
                    name: item.city,
                    type: 'line',
                    data: item.casts.map((info) => {
                        return info.daytemp
                    })
                }
            })  
        }; 
        this.setState({
            option
        })
    }

    render() {
        const { option } = this.state
        return (
            <div>
                {option==={}?<div></div>:<ReactEcharts option={option} notMerge ={true}/>}
                {/* notMerge表示不和之前的重叠 */}
            </div>
        )
    }
}

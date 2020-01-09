import React, { Component } from 'react'
import { Table } from 'antd';
import { filters } from './citys';
import PropTypes from 'prop-types'
import { Spin } from 'antd';
import { Modal } from 'antd';
import Future from './future';

const columns = [
    {
        title: '城市',
        dataIndex: 'city',
    },
    {
        title: '天气',
        dataIndex: 'weather',
        filters: filters,

        filterMultiple: true,
        onFilter: (value, record) => record.weather.indexOf(value) === 0,
    },
    {
        title: '气温',
        dataIndex: 'temperature',
        sorter: (a, b) => a.temperature.replace(/°C/, "") - b.temperature.replace(/°C/, ""),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: '风力',
        dataIndex: 'windPower',
        sorter: (a, b) => a.windPower.replace(/≤/, "") - b.windPower.replace(/≤/, ""),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: '风向',
        dataIndex: 'windDirection',
    },
    {
        title: '湿度',
        dataIndex: 'humidity',
        sorter: (a, b) => a.humidity - b.humidity,
        sortDirections: ['descend', 'ascend'],
    },
];


// function onChange(pagination, filters, sorter, extra) {
//     console.log('params', pagination, filters, sorter, extra);
// }

export default class WeatherTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            spinning: true,
            visible: false,
            clickCity: "",
            cityCode: ""
        }
    }

    static propTypes = {
        weatherdataList: PropTypes.array
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.handleData(props.data)
    }
    //处理天气数据
    handleData = (weatherdata) => {
        var data = []
        const weatherdataList = weatherdata
        for (let index = 0; index < weatherdataList.length; index++) {
            const element = weatherdataList[index];
            const info = element.casts[0]
            data.push(
                {
                    key: element.adcode,
                    city: <span className="curcity" onClick={this.showModal} citycode={element.adcode} >{element.city}</span>,
                    weather: info.dayweather,
                    temperature: info.daytemp + "°C",
                    windPower: info.daypower,
                    windDirection: info.daywind,
                    humidity: Math.floor(Math.random() * 100 + 1)
                }
            )
        }
        this.setState({ data, spinning: false })
    }

    //Modal操作函数
    showModal = (e) => {
        const cityCode = e.target.getAttribute('citycode')
        const clickCity = e.target.innerText
        console.log(clickCity)
        this.setState({
            visible: true,
            clickCity,
            cityCode
        });
    };
    handleOk = e => {
        this.setState({
            visible: false,
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { data, spinning, cityCode, clickCity } = this.state
        return (
            <div>
                <Spin spinning={spinning}>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </Spin>
                <Modal
                    title={clickCity + "未来三天天气预测"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1280}
                >
                    <Future cityCode={cityCode} />
                </Modal>
            </div>
        )
    }
}

import React, { Component } from 'react'
import './index.less'
import { Select, Button } from 'antd';
import WeatherTable from './weatherTable';
import { city_code } from './citys';
import { reqWeather } from '../api/ajax';
import Time from './time';
import Chart from './chart';


const { Option } = Select;
const cityList = [];
for (let index = 0; index < city_code.length; index++) {
    const element = city_code[index];
    cityList.push(<Option key={element.code} value={element.code}>{element.name}</Option>);
}

export default class Index extends Component {
    state = {
        weatherdataList: [],
        seleCitys: []
    }
    componentDidMount() {
        this.getweatherdata()
    }
    //获取用户点击城市
    handleChange = (seleCitys) => {
        this.setState({ seleCitys })
    }
    //获取数据
    getweatherdata = async () => {
        var weatherdataList = []
        var seleCitys = this.state.seleCitys
        //用户输入为空
        if (seleCitys.length === 0) {
            seleCitys = [110000, 310000, 330100, 510100, 440300]
        }
        for (let index = 0; index < seleCitys.length; index++) {
            const element = seleCitys[index];
            const weatherdata = await reqWeather(element)
            weatherdataList.push(weatherdata)
        }
        this.setState({ weatherdataList })
    }

    render() {
        const { weatherdataList } = this.state
        return (
            <div className="container">
                <div>
                    <span>城市：</span>
                    <Select
                        mode="multiple"
                        style={{ width: 200, margin: "0px 20px" }}
                        placeholder="请选择"
                        defaultValue={[]}
                        showArrow={true}
                        onChange={this.handleChange}
                    >
                        {cityList}
                    </Select>
                    <Button type="primary" onClick={this.getweatherdata}>查询</Button>
                </div>
                <div className="time">
                    <Time />
                </div>
                <div className="weathertable">
                    <WeatherTable data={weatherdataList} />
                </div>
                <div className="chart">
                    <Chart data={weatherdataList} />
                </div>
            </div>
        )
    }
}

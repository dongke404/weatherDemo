import React, { Component } from 'react'
import { Table } from 'antd';
import { reqWeather } from '../api/ajax';

const columns = [
    {
        title: '时间',
        dataIndex: 'date',
    },
    {
        title: '白天天气',
        dataIndex: 'dayweather',

    },
    {
        title: '夜晚天气',
        dataIndex: 'nightweather',

    },
    {
        title: '白天气温',
        dataIndex: 'daytemp',

    },
    {
        title: '夜晚气温',
        dataIndex: 'nighttemp',
    },
    {
        title: '白天风向',
        dataIndex: 'daywind',

    },
    {
        title: '夜晚风向',
        dataIndex: 'nightwind',

    },
    {
        title: '白天风力',
        dataIndex: 'daypower',

    },
    {
        title: '夜晚风力',
        dataIndex: 'nightpower',

    },
];

export default class Future extends Component {
    state={
        // citycode:"",
        data:[]
    }  
    componentDidMount(){
        this.handledata (this.props.cityCode)
    }

    UNSAFE_componentWillReceiveProps(props){
        console.log("接受属性",props)
        this.handledata(props.cityCode)
    }

    handledata=async(cityCode)=>{
        const result=await reqWeather(cityCode)
        var data=result.casts.slice(1,4)
        data.map((item,index)=>{
            return item.key=index
        })
        this.setState({
            data
        })
    }

    render() {
        const {data}=this.state
        return (
            <div>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>
        )
    }
}

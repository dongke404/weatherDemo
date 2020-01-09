//天气类型数据
const weatherType = ["晴", "多云", "雨", "阴", "雪"]
export const filters=weatherType.map((item)=>{
    return {
        text:item,
        value:item,
    }
})

//城市列表
export const city_code=[
    {name:'北京市',code:110000},
    {name:'上海市',code:310000},
    {name:'杭州市',code:330100},
    {name:'武汉市',code:420100},
    {name:'成都市',code:510100},
    {name:'长沙市',code:430100},
    {name:'深圳市',code:440300},
    {name:'广州市',code:440100},
    {name:'天津市',code:120000},
    {name:'重庆市',code:500000},
    {name:'南京市',code:320100},
    {name:'青岛市',code:370200},
    {name:'乌鲁木齐市',code:650100},

]

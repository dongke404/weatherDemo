import jsonp from 'jsonp' 
import { message } from 'antd'

export const reqWeather = (city_code) => {
    return new Promise((resolve, reject) => { 
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=bae6cdea56f4893fc19226c1922b10e5&city=${city_code}&output=json&extensions=all`
      jsonp(url, {}, (error, data) => {
        if (!error && data.status==="1") { // 成功的
          const result = data.forecasts[0]
          resolve(result)
        } else { // 失败的
          message.error('获取天气信息失败')
        }
      })
    })
  }

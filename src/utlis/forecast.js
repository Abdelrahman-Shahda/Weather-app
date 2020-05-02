const request=require('request');


const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=5bffcc01361220f44d11f925a4f73097&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`;
    request({
        url,
        json:true
    },(error,{body})=>{
        if (error)
        {
            callback("Unable to connect to web servers");
        }else if(body.error)
        {
            callback("Wrong latitude")
        }else{
            callback(undefined,`The temperature is ${body.current.temperature} while it feels like ${body.current.feelslike}`);
        }
    })
}









module.exports=forecast;
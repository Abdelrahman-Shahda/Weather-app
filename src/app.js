const path= require('path')
const express=require('express'); 
const hbs=require('hbs');
const forecast=require('./utlis/forecast')
const geoCode=require('./utlis/gecode')

//Setting paths for express config
const staticFileDir=path.join(__dirname,'../public')
const viewsDir=path.join(__dirname,'../templates/views')
const partialsDir=path.join(__dirname,'../templates/partials')

//Express config
const app=express();
const port = process.env.PORT ||3000;
app.use(express.static(staticFileDir));

//Set handlebars engine and set views directory
app.set('view engine','hbs');
app.set('views',viewsDir);
hbs.registerPartials(partialsDir);

app.get('/weather',(req, res)=>{
    
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        else
        {
            forecast(latitude,longitude,(error,forecastdata)=>{
                if(error)
                {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecastdata,
                    location
                })
        })
        }
    })
})
app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:"Shahda"
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Page',
        name:"Shahda"
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Shahda',
        message:'enta gamed keda leh ya man'
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404page',{
        title:'Help page not found'
    })
})
app.get('*',(req ,res)=>{
    res.render('404page',{
        title:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port);
});


document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();

    const search=document.querySelector('input');
    const url='http://localhost:3000/weather?address='+encodeURIComponent(search.value);
    const message=document.querySelector('#message-1');
    message.textContent='loading'
    fetch(url).then((response)=>{
    response.json().then((data)=>
       { if(data.error)
        {
            message.textContent=data.error;
            return console.log(data.error);
        }
        console.log(data)
        message.textContent=data.forecastdata;
        }
    )
}
)
    
})
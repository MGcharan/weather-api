async function fetchData(){
    let response=await fetch("https://restcountries.com/v3.1/all");
    let data=await response.json();
    return data
}
console.log(fetchData());

async function weatherData(cityName){
    let apiKey="9a741f00222bb71b168de49fbfcaa5e8";
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    let data=await response.json();
    return data
}
async function createCart(country){
    let name=country.name.common;
    let capital=country.capital;
    let region=country.region;
    let latitude=country.latlng[0];
    let longitude=country.latlng[1];
    let countryCode=country.cca3;
    let flag=country.flags.png;

    let colDiv=document.createElement("div")
    colDiv.setAttribute("class","col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-4 mb-3 justify-content-center");
    
    let cart=document.createElement("div")
    cart.className="card h-100 border-0 rounded-4 ";
    cart.style.background="linear-gradient(120deg,#C69749,#E5E5CB,#ACB1D6)"
   
    // cart.style.background='url("video/card-video.mp4")'
    
   
    let cartHeader=document.createElement("div")
    cartHeader.className="card-header text-white  bg-dark text-center fs-3 border-0 rounded-top-4";

    cartHeader.textContent=name;


    let cartBody=document.createElement("div")
    cartBody.className="card-body  text-center fw-bold fs-3 ";
   
    
    
    // let hover=document.querySelector(".fix")


   


    let cartImage=document.createElement("img")
    cartImage.setAttribute("class","card-img-top")//
    cartImage.setAttribute("style","height:8rem; width:12rem;border:2px groove black")
    cartImage.src=flag
    cartImage.alt="flagimage";

    let cartDetails=document.createElement("div")
    cartDetails.setAttribute("class","card-text fs-5 mt-3")
    cartDetails.innerHTML=` Capital: ${capital} <br>-------------------<br> Region:${region}<br>-------------------<br> Latitiude :${latitude},<br>Longtiude:${longitude}<br>-------------------<br>CountryCode:${countryCode} <br>`;



    let button1=document.createElement("button")
    button1.setAttribute("class","btn btn-success fs-5 mt-3 fw-bold ")
    button1.textContent="Click For Weather";


    button1.onclick=async function(){
        let w_data = await weatherData(capital);
        let temp = w_data.main.temp;
        let pressure = w_data.main.pressure;
        let humidity = w_data.main.humidity;
        let w_speed = w_data.wind.speed;


        let weather_alert=document.createElement("div")
        weather_alert.className="alert  text-light m-3 rounded-4 fs-5";
        weather_alert.style.background="linear-gradient(120deg,#75C2F6,#E5E5CB,#F5F0BB)"
        weather_alert.style.backgroundImage='url("video/img.png")'


        let head= document.createElement("h3")
        head.textContent="Weather Details ";
        
        let list=document.createElement("ul")
        list.innerHTML=`<hr />Temperature: ${temp} &deg;C <br><hr/>Pressure:${pressure}mb<br><hr/>Humidity:${humidity}%<br><hr/>Windspeed:
        ${ w_speed}km/h`;

        let button2=document.createElement("button")
        button2.setAttribute("class","btn btn-secondary  fs-5 mt-3 fw-bold")
        button2.textContent="Go Back"

        button2.onclick=function(){
            cartBody.removeChild(weather_alert);
            cartBody.append(cartImage,cartDetails);

        }
        weather_alert.append(head,list,button2)
        cartBody.removeChild(cartDetails)
        cartBody.removeChild(cartImage)
        cartBody.appendChild(weather_alert)
    }
    colDiv.appendChild(cart)
    cart.append(cartHeader,cartBody)
    cartBody.append(cartImage,cartDetails)
    cartDetails.appendChild(button1)

    return colDiv;
}

async function createCard(){
    let container=document.getElementById("container")
    let cartRow=document.getElementById("cartRow")

    let content=await fetchData()
    for (let country of content ){
        let cart=await createCart(country)
        cartRow.append(cart)

    }
    
}
createCard()

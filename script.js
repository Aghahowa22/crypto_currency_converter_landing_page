// the toggle function to bring menu during mobile responsiveness

const myNav = document.querySelector(".nav_link");
const myNav2 = document.querySelector(".nav_link2");
const toggleBtn = document.getElementById("menu_btn");

toggleBtn.addEventListener("click", () => {
    myNav.classList.add("open");
    myNav2.classList.add("open1");

});

const closeBtn = document.getElementById("close_btn");
closeBtn.addEventListener("click", () => {
    myNav.classList.remove("open");
    myNav2.classList.remove("open1");
    
})


const fromCurrency = document.querySelector(".select_box_from  select");
const toCurrency = document.querySelector(".select_box_to  select");
const amountEl = document.getElementById("input_amount");
const exchangeRateTxt = document.getElementById("converted_amount");


const apiKey = "3b78d72192b4090c5cd3a555";


// created objects for countries with currency code in a seperate js file
// then i called listCurrencies from the seperate js file



[fromCurrency, toCurrency].forEach((select, i) => {
    for (let curcode in listCountries) {

       const selected = (i === 0 && curcode === "USD") || (i === 1 && curcode === "GBP") ? "selected" : "";

        select.insertAdjacentHTML(
         "beforeend",
         `<option value="${curcode}"${selected}>${curcode}</option>`
        );   
    }

    // event in select and option(changes the flag images from the flag api )

    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/h20/${listCountries[code].toLowerCase()}.png`;

        // the function below helps to convert the currency as the flag is changed

        getExchangeRate();
    })
});

// getting data from API

async function getExchangeRate(){
    const amountValue = amountEl.value;
    exchangeRateTxt.textContent = "Please wait.....";
  

    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`,);
        const result = await response.json();

        const exRate = result.conversion_rates[toCurrency.value];
        const totalExRate = amountValue * exRate.toFixed(2);
        exchangeRateTxt.textContent = ` ${totalExRate} `;

    }catch(error){
        exchangeRateTxt.textContent = "Something went wrong......";
    }
    
}

window.addEventListener("DOMContentLoaded", getExchangeRate);


//  the eventlistener makes the rate(converted amount) change automatically without a button click 
amountEl.addEventListener("input", getExchangeRate);




// getting the time and date

months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

days =
  ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  ,
];

date_data = new Date()
// get day
current_day = date_data.getDay()
document.getElementById("day").textContent = days[current_day];

// get month and year

current_month = date_data.getMonth()
current_date = date_data.getDate()
current_year = date_data.getFullYear()

document.getElementById("month_date_year").textContent = `${months[current_month]} - ${current_date} - ${current_year}`

// get time

current_hour = date_data.getHours()
current_minutes = date_data.getMinutes()
am_pm = "";

if(current_hour >= 12){
// its PM
am_pm = "PM"
}else{
 // its AM
    am_pm = "AM"
}

document.getElementById("time").textContent = `${current_hour} : ${current_minutes} ${am_pm}`





















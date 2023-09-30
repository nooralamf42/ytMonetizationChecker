let audio = new Audio()

// to call function when enter key is pressed on input field 

channelLink.onkeydown = (event) => {
    if(event.key == "Enter")
      getData()
  }

// to call function when get info button is clicked 

getInfoBtn.onclick = () => {
    setTimeout(
        getData(),2000
    )
}

// function to get data

getData = () => {
if(channelLink.value.includes("youtube.com/")){
    messegeImg.classList.add("hideImg")
    output.innerHTML = ""
    loadingCircle.classList.remove("hideImg")
    fetch('https://api.codetabs.com/v1/proxy?quest=' + channelLink.value)
    .then((response) => {
    return response.text();
    }).then((data) => {
        loadingCircle.classList.add("hideImg")
    if (data.includes('"key":"is_monetization_enabled","value":"true"')){
        audio.src = "cash-register-purchase-87313.mp3"
        audio.play()
        messegeImg.classList.remove("hideImg")
        messegeImg.src = "https://media.giphy.com/media/SBAToc4g0h89W/giphy.gif"
        output.innerHTML = "Channel is <span style='color: #10b981;'>MONETIZED!!</span>"
    }
    else{
        audio.src = "boo-36556.mp3"
        audio.play()
        messegeImg.classList.remove("hideImg")
        messegeImg.src = "https://media.giphy.com/media/l0IsI3mebkE6yiig8/giphy.gif"
        output.innerHTML = "Channel is <span style='color: #f43f5e;'>NOT MONETIZED!!</span>"

    }
})
}
else{
    let orignalChannelLinkValue = channelLink.value
    channelLink.value = "Invalid Channel Link!"
    setTimeout(()=>{
    channelLink.value = orignalChannelLinkValue
    },1500)
}
}

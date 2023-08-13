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
        audio.src = "mon.mp3"
        audio.play()
        messegeImg.classList.remove("hideImg")
        messegeImg.src = "https://media.tenor.com/E6WSW38Kn94AAAAC/kbc-great.gif"
        output.innerHTML = "Channel is <span style='color: rgb(22, 188, 0);'>monetized</span>"
    }
    else{
        audio.src = "notMon.mp3"
        audio.play()
        messegeImg.classList.remove("hideImg")
        messegeImg.src = "https://media.tenor.com/ciNDyf6AgH0AAAAd/disappointed-disappointed-fan.gif"
        output.innerHTML = "Channel is <span style='color: rgb(255, 36, 36);'>not monetized</span>"

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


// to call function when enter key is pressed on input field 

channelLink.onkeydown = (event) => {
    if(event.key == "Enter")
      getData()
  }

// to call function when get info button is clicked 

getInfoBtn.onclick = () => {
    getData()
}

// function to get data

getData = () => {
if(channelLink.value.includes("youtube.com/")){
    fetch('https://api.codetabs.com/v1/proxy?quest=' + channelLink.value)
    .then((response) => {
    return response.text();
    }).then((data) => {
    if (data.includes('"key":"is_monetization_enabled","value":"true"')){
        messegeImg.classList.remove("hideImg")
        messegeImg.src = "https://media.tenor.com/5FI2iWeIs70AAAAM/yes-yes-yes.gif"
        output.innerHTML = "Channel is <span style='color: rgb(22, 188, 0);'>monetized</span>"
    }
    else{
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

// to disable right click on body

// window.addEventListener("contextmenu", (e) => e.preventDefault())


// pasting link on right click on input field

channelLink.addEventListener("contextmenu", () => {
navigator.clipboard
.readText()
.then(
    cliptext =>
        (channelLink.value = cliptext),
);
})

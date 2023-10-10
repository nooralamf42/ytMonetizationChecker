let audio = new Audio();

// to call function when enter key is pressed on input field
channelLink.onkeydown = (event) => {
  if (event.key == "Enter") getData();
};

// to call function when get info button is clicked
getInfoBtn.onclick = () => {
  setTimeout(getData(), 2000);
};

// function to get data
getData = async () => {
  if (channelLink.value.includes("youtube.com/")) {
    addLoading();

    let response = await fetch(
      "https://api.codetabs.com/v1/proxy?quest=" + channelLink.value
    );
    const data = await response.text();

    loadingCircle.classList.add("hideImg");
    if (data.includes('"key":"is_monetization_enabled","value":"true"')) {
      audio.src = "cash-register-purchase-87313.mp3";
      audio.play();
      messegeImg.classList.remove("hideImg");
      messegeImg.src = "https://media.giphy.com/media/SBAToc4g0h89W/giphy.gif";
      output.innerHTML =
        "Channel is <span style='color: #10b981;'>MONETIZED!!</span>";
      addItem(channelLink.value);
    } else if (
      data.includes('"key":"is_monetization_enabled","value":"false"')
    ) {
      audio.src = "boo-36556.mp3";
      audio.play();
      messegeImg.classList.remove("hideImg");
      messegeImg.src =
        "https://media.giphy.com/media/l0IsI3mebkE6yiig8/giphy.gif";
      output.innerHTML =
        "Channel is <span style='color: #f43f5e;'>NOT MONETIZED!!</span>";
      addItem(channelLink.value);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Channel not found! Check the typed text",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Error!",
      text: "Invalid Channel Link! Use https://youtube.com/",
      icon: "warning",
    });
  }
};

addLoading = () => {
  messegeImg.classList.add("hideImg");
  output.innerHTML = "";
  loadingCircle.classList.remove("hideImg");
};

function recentchannel() {
  let viewedChannels = getItem();
  Swal.fire(
    "Recently Viewed Channels",
    `<table>
  <tbody style="text-align: left">
      <tr>
          <td>${viewedChannels[0]}</td>
      </tr>
      <tr>
          <td>${viewedChannels[1]}</td>
      </tr>
      <tr>
          <td>${viewedChannels[2]}</td>
      </tr>
      <tr>
          <td>${viewedChannels[3]}</td>
      </tr>
      <tr>
          <td>${viewedChannels[4]}</td>
      </tr>
  </tbody>
</table>`
  );
}

function addItem(value) {
  // Retrieve the existing array from localStorage or create an empty one
  var storedArray = JSON.parse(localStorage.getItem("channels")) || [
    "",
    "",
    "",
    "",
    "",
  ];

  // Add the new value to the end of the array
  storedArray.push(value);

  // If the array size exceeds the maxSize, remove the oldest item(s)
  while (storedArray.length > 5) {
    storedArray.shift(); // Remove the first (oldest) item
  }

  // Store the updated array back in localStorage
  localStorage.setItem("channels", JSON.stringify(storedArray));
}

function getItem() {
  // Retrieve the array from localStorage
  var storedArray = localStorage.getItem("channels");

  return storedArray ? JSON.parse(storedArray) : ["", "", "", "", ""];
}

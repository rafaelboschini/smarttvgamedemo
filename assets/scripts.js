const assets = {
  audios: ["assets/audios/intro.mp3"],
  images: {
    boy: "assets/images/benjamin.png",
    girl: "assets/images/giovana.png",
    boyHit: "assets/images/benjamin-hit.png",
    girlHit: "assets/images/giovana-hit.png",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  let scoreBoy = 0;
  let scoreGirl = 0;
  const maxDivs = 5;
  const divs = [];
  let coordinates = {};
  const backgroundMusic = initializeBackgroundMusic();
  const audioControl = document.getElementById("audioControl");

  audioControl.addEventListener("click", toggleBackgroundMusic);

  setInterval(createOrUpdateDivs, 1000); // Updates divs at regular intervals
  setInterval(moveDivs, 50); // Moves divs at regular intervals

  document.addEventListener("click", handleMouseClick); // Listens for mouse clicks

  const enableDualPairingRequest = enableDualPairing(); // Initiates a request for dual pairing
  const sensorDataRequest = getSensorData(); // Initiates a request to get sensor data

  initializeSplashscreen(); // Initializes the splash screen progress bar

  // Functions

  function initializeBackgroundMusic() {
    // Initializes and plays background music
    const randomIndex = Math.floor(Math.random() * assets.audios.length);
    const backgroundMusic = new Audio();
    const src1 = document.createElement("source");
    src1.type = "audio/mpeg";
    src1.src = assets.audios[randomIndex];
    backgroundMusic.loop = true;
    backgroundMusic.appendChild(src1);
    backgroundMusic.play();
    return backgroundMusic;
  }

  function toggleBackgroundMusic() {
    // Toggles the background music play/pause
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      audioControl.style.filter = "grayScale(0)";
    } else {
      backgroundMusic.pause();
      audioControl.style.filter = "grayScale(1)";
    }
  }

  function createOrUpdateDivs() {
    // Creates or updates divs based on their count
    if (divs.length < maxDivs) {
      createDiv();
    } else {
      updateDivs();
    }
  }

  function createDiv() {
    // Creates a new div and adds it to the document
    const div = document.createElement("div");
    div.classList.add("box");
    div.style.left = Math.random() * (window.innerWidth - 50) + "px";
    div.style.top = window.innerHeight + "px";
    chooseBalloon(div);
    document.body.appendChild(div);
    divs.push(div);
  }

  function updateDivs() {
    // Updates the positions of existing divs
    divs.forEach(function (div) {
      let top = parseInt(div.style.top, 10);
      if (top <= 0) {
        removeDiv(div);
      } else {
        div.style.top = top - 10 + "px";
      }
    });
  }

  function chooseBalloon(div) {
    // Randomly selects and displays an image inside the div
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      div.isBoy = true;
      div.innerHTML = '<img src="' + assets.images.boy + '" width="100%"/>';
    } else {
      div.isBoy = false;
      div.innerHTML = '<img src="' + assets.images.girl + '" width="100%"/>';
    }
  }

  function removeDiv(div) {
    // Removes a div from the document
    const index = divs.indexOf(div);
    if (index > -1) {
      divs.splice(index, 1);
      document.body.removeChild(div);
    }
  }

  function moveDivs() {
    // Moves the divs upwards
    divs.forEach(function (div) {
      let top = parseInt(div.style.top, 10);
      if (top <= 0) {
        removeDiv(div);
      } else {
        div.style.top = top - 10 + "px";
      }
    });
  }

  function handleMouseClick(event) {
    // Handles mouse click events
    const x = event.clientX;
    const y = event.clientY;
    checkHit(x, y);
  }

  function checkHit(x, y) {
    // Checks if the mouse click hits any div
    divs.forEach(function (div) {
      const rect = div.getBoundingClientRect();
      const divX = rect.left;
      const divY = rect.top;

      if (
        x >= divX &&
        x <= divX + rect.width &&
        y >= divY &&
        y <= divY + rect.height
      ) {
        div.classList.add("hit");
        if (div.isBoy) {
          scoreBoy++;
          div.innerHTML =
            '<img src="' + assets.images.boyHit + '" width="100%"/>';
        } else {
          scoreGirl++;
          div.innerHTML =
            '<img src="' + assets.images.girlHit + '" width="100%"/>';
        }
      }
    });
  }

  function enableDualPairing() {
    // Initiates a request to enable dual pairing
    return webOS.service.request("luna://com.webos.service.mrcu", {
      method: "enableDualPairing",
      parameters: { enable: true },
      onSuccess: function (response) {
        console.log("Dual Pairing mode enabled");
      },
      onFailure: function (error) {
        console.error("Failed to enable Dual Pairing mode:", error.errorText);
      },
    });
  }

  function getSensorData() {
    // Initiates a request to get sensor data
    return webOS.service.request("luna://com.webos.service.mrcu", {
      method: "sensor/getSensorData",
      parameters: { callbackInterval: 1, subscribe: true },
      onSuccess: function (response) {
        coordinates = response.coordinate;
      },
      onFailure: function (error) {
        console.error("Failed to get sensor data:", error.errorText);
      },
    });
  }

  function initializeSplashscreen() {
    // Initializes the splash screen progress bar
    const splashscreen = document.getElementById("splashscreen");
    const progressBar = document.getElementById("progressBar");
    const progress = document.getElementById("progress");
    let progressValue = 0;

    const progressInterval = setInterval(function () {
      // Updates the progress bar until it reaches 100%
      progressValue += 5;
      progress.style.width = progressValue + "%";

      if (progressValue >= 100) {
        clearInterval(progressInterval);
        splashscreen.style.display = "none"; // Hides the splash screen
        document.body.style.overflow = "auto"; // Restores scrolling
      }
    }, 1000);

    document.body.style.overflow = "hidden"; // Hides scrolling initially
  }
});

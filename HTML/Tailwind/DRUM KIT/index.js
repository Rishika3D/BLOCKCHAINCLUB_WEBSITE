const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 1;
  gainNode.connect(audioCtx.destination);


  const volumeSlider = document.getElementById("volumeSlider");
  volumeSlider.addEventListener("input", () => {
    gainNode.gain.value = parseFloat(volumeSlider.value);
    console.log("Volume set to:", gainNode.gain.value.toFixed(2));
  });


  function resumeAudioContext() {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    document.body.removeEventListener("click", resumeAudioContext);
  }
  document.body.addEventListener("click", resumeAudioContext);


  function playSound(file) {
    const audio = new Audio(file);
    const track = audioCtx.createMediaElementSource(audio);
    track.connect(gainNode);
    audio.play();
  }


  function makeSound(key) {
    switch (key) {
      case "w": playSound("sounds/tom-1.mp3"); break;
      case "a": playSound("sounds/tom-2.mp3"); break;
      case "s": playSound("sounds/tom-3.mp3"); break;
      case "d": playSound("sounds/tom-4.mp3"); break;
      case "j": playSound("sounds/snare.mp3"); break;
      case "k": playSound("sounds/crash.mp3"); break;
      case "l": playSound("sounds/kick-bass.mp3"); break;
      default: console.log("Unknown key: " + key);
    }
  }


  function buttonAnimation(currentKey) {
    const activeButton = document.querySelector("." + currentKey);
    if (!activeButton) return; // safety check
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }


  const drums = document.querySelectorAll(".drum");
  drums.forEach(button => {
    button.addEventListener("click", function () {
      const buttonInnerHTML = this.innerHTML;
      makeSound(buttonInnerHTML);
      buttonAnimation(buttonInnerHTML);
    });
  });

  // Keyboard key press listener
  document.addEventListener("keypress", function(event){
    makeSound(event.key);
    buttonAnimation(event.key);
  });
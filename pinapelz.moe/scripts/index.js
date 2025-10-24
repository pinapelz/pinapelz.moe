function fetchDiscordStatus(userId) {
    const API_URL = `https://api.lanyard.rest/v1/users/${userId}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const discordStatus = data.data.discord_status;

        const statusColors = {
          online: "#43b581",
          idle: "#faa61a",
          dnd: "#f04747",
          offline: "#747f8d",
        };

        const statusText = {
          online: "Online",
          idle: "Idle",
          dnd: "Do Not Disturb",
          offline: "Offline",
        };

        const statusSection = document.getElementById(`discord-status`);
        const statusTextElement = statusSection.querySelector(".status-text");

        statusSection.style.backgroundColor = statusColors[discordStatus];
        statusTextElement.textContent = "Currently: " + statusText[discordStatus];
      })
      .catch(error => console.error("Error fetching Discord status:", error));
  }

document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "Give a man a fish, learn him how to eat, give a man- learn a man how to - xQc",
    "Yeah I'm GAY, Good at Yugioh - Rosemi Lovelock",
    "yipee - Erina Makina",
    "Your friend doesn't like Vtubers? Tell your friend to get some taste - Pavolia Reine",
  ];

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  const quoteElement = document.getElementById("quote");
  quoteElement.innerHTML = `<i>${getRandomQuote()}</i>`;
});

function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const year = now.getFullYear();
  let message = "good day!";
  if (now.getHours() >= 0 && now.getHours() < 7) {
      message = "(you should go to bed)";
  } else if (now.getHours() < 12) {
      message = "good morning";
  } else if (now.getHours() >= 12 && now.getHours() < 18) {
      message = "afternoon to you!";
  } else if (now.getHours() >= 18) {
      message = "evening :)";
  }
  clockElement.innerHTML = `<span>${month}/${day}/${year} ${hours}:${minutes}:${seconds}</span> ` + message;
}

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".random-float");
  const positions = [];

  images.forEach((img) => {
    let randomTop, randomLeft;
    let overlap;

    do {
      overlap = false;
      randomTop = Math.random() * 100;
      randomLeft = Math.random() * 100;
      if (randomTop > 30 && randomTop < 70) {
        overlap = true;
      }
      if (randomLeft > 30 && randomLeft < 70) {
        overlap = true;
      }
      positions.forEach(pos => {
        const distance = Math.sqrt(Math.pow(randomTop - pos.top, 2) + Math.pow(randomLeft - pos.left, 2));
        if (distance < 10) { 
          overlap = true;
        }
      });
    } while (overlap);

    positions.push({ top: randomTop, left: randomLeft });

    const randomDuration = Math.random() * 10 + 3;

    img.style.top = `${randomTop}%`;
    img.style.left = `${randomLeft}%`;
    img.style.animationDuration = `${randomDuration}s`;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  function fetchNowPlaying() {
    fetch('https://a4.asurahosting.com/api/nowplaying_static/patchworkarchive.json') // Replace with the actual API endpoint
      .then(response => response.json())
      .then(data => {
        const nowPlaying = data.now_playing.song;
        document.getElementById('song-title').textContent = nowPlaying.title;
        document.getElementById('song-artist').textContent = nowPlaying.artist;
        const songArt = document.getElementById('song-art');
        songArt.src = nowPlaying.art;
        songArt.style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching now playing data:', error);
      });
  }

  fetchNowPlaying();
  setInterval(fetchNowPlaying, 60000);
});

document.addEventListener("DOMContentLoaded", () => {
  const images = [
      "assets/sayo-fries.gif",
      "assets/chuni-reaction.gif",
      "assets/haruhikage.jpg",
  ];

  function displayRandomImage() {
      const randomIndex = Math.floor(Math.random() * images.length);
      const randomImage = images[randomIndex];
      
      const imageContainer = document.querySelector('.random-image-container');
      imageContainer.innerHTML = `<img src="${randomImage}" alt="Random Image" class="border-img">`;
  }

  displayRandomImage();
});

setInterval(updateClock, 1000);
updateClock();
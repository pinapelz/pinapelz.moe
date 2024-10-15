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
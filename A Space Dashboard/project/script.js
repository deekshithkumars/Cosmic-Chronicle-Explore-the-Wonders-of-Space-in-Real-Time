const nasaApiKey = 'vjZegdSHsn0hNn9uwq7owOwbiwG2URBG0syvrqEf'; // Replace with your NASA API key
// Replace with your N2YO API key


// Fetch and display celestial events (APOD)
fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
  .then(response => response.json())
  .then(data => {
    const formattedData = `${data.title}: ${data.date}`;
    document.getElementById('celestial-events-data').innerHTML = formattedData;
  });
    const launchLibraryApiKey = 'YOUR_LAUNCH_LIBRARY_API_KEY'; // Replace with your Launch Library API key
// Fetch and display upcoming space launches (Launch Library)
fetch(`https://ll.thespacedevs.com/2.0.0/launch/upcoming/?search=nasa&apiKey=${launchLibraryApiKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const launchName = data.results[0].name;
    const launchDate = data.results[0].window_start;

    const formattedData = `${launchName}: ${launchDate}`;
    document.getElementById('launch-schedule-data').innerHTML = formattedData;
  })
  .catch(error => {
    console.error('Error fetching launch schedule:', error);
    document.getElementById('launch-schedule-data').innerHTML = 'Error fetching launch schedule';
  });

  const apiKey = "qr2VTZPvb7lA7UGTgWdwRh7zHqIX2C8DLX4a3RJ3";
const url = "https://api.nasa.gov/planetary/apod?";

let container = document.querySelector(".container");
let button = document.getElementById("fetch-image");

button.addEventListener("click", () => {
  getImage("normal");
});

let hdButton = document.getElementById("fetch-hd");
hdButton.addEventListener("click", () => {
  getImage("hd");
});

function getImage(value) {
  let imageContainer = document.querySelector(".image-container");
  imageContainer.remove();

  let newImageContainer = document.createElement("div");
  newImageContainer.classList.add("image-container");

  container.append(newImageContainer);

  let dateInput = document.querySelector(".details-input input");
  let date = dateInput.value;

  let request = new XMLHttpRequest();
  request.open("GET", url + "date=" + date + "&api_key=" + apiKey, true);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      let imageUrl;
      if (value === "hd") {
        imageUrl = data.hdurl;
      } else {
        imageUrl = data.url;
      }
      let image = document.createElement("img");
      image.src = imageUrl;
      newImageContainer.append(image);
    } else {
      window.alert("Please enter the date in correct format.");
    }
  };
}
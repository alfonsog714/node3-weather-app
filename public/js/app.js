// console.log("Client side JS file is loaded!");

// fetch("http://puzzle.mead.io/puzzle")
//   .then(res => {
//     res.json().then(data => {
//       console.log(data);
//     });
//   })
//   .catch();

// fetch("http://localhost:3000/weather?address=Boston")
//   .then(res => {
//     res.json().then(data => {
//       console.log(data);
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#message");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  message.innerHTML = "<p>Loading...</p>";

  console.log(location);

  fetch(`/weather?address=${location}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        message.innerHTML = `<p>${data.error}</p>`;
      } else {
        console.log(data);
        message.innerHTML = `
        <p>The weather in ${data.location}: </p>
        <p>Temperature - ${data.temperature}</p>
        <p>Humidity - ${data.humidity}</p>
        <p>Chance of rain - ${data.rainChance}</p>
        <p>Summary - ${data.summary}</p>`;
      }
    });
  });
});

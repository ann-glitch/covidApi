//a helper function for the table data
function td(content) {
  const td = document.createElement("td");
  td.innerHTML = content;
  return td;
}

//fetching the api data and displaying them on the table.
async function getData() {
  try {
    const response = await fetch("https://api.covid19api.com/summary");
    const covidData = await response.json();
    console.log(covidData.Countries);

    covidData.Countries.forEach((data) => {
      const table = document.querySelector(".table");
      const tbody = document.createElement("tbody");
      const tr = document.createElement("tr");

      tr.appendChild(td(data.Country));
      tr.appendChild(td(data.TotalConfirmed));
      tr.appendChild(td(data.TotalDeaths));
      tr.appendChild(td(data.Date));

      tbody.appendChild(tr);
      table.appendChild(tbody);
    });
  } catch (err) {
    console.log(err);
  }
}

getData();

function filterCountries(event) {
  const inputData = event.target.value.toLowerCase();

  document.querySelectorAll("tbody").forEach((data) => {
    const searchedKey = data.firstChild.textContent;

    if (searchedKey.toLowerCase().indexOf(inputData) > -1) {
      data.style.display = "block";
    } else {
      data.style.display = "none";
    }
  });
}

const inputBox = document.querySelector(".input-box");
inputBox.addEventListener("keydown", filterCountries);

const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", () => {
  location.reload();
});
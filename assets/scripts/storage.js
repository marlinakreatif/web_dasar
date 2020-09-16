const CACHE_KEY = "calculation_hisory";

function checkStorage() {
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  if (checkStorage) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.unshift(data);
    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

function showHistory() {
  if (checkStorage) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

function renderHistory() {
  const historyData = showHistory();
  let historyList = document.getElementById("historyList");

  historyList.innerHTML = "";

  for (let hd of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${hd.firstNumber}</td>
        <td>${hd.operators}</td>
        <td>${hd.secondNumber}</td>
        <td>${hd.result}</td>    
    `;

    historyList.appendChild(row);
  }
}

renderHistory();

const API_URL = "https://api4.binance.com/api/v3/ticker/24hr";
const list = document.querySelector("#coin-list");
const searchInput = document.querySelector("#search-input");
const status = document.querySelector("#status");
const tabs = document.querySelectorAll(".tab");

let coins = [];
let currentView = "all";
let favorites = JSON.parse(localStorage.getItem("cryptoFavorites")) || [];

function formatNumber(value) {
  return Number(value).toLocaleString("en-US", {
    maximumFractionDigits: 8
  });
}

function saveFavorites() {
  localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));
}

function toggleFavorite(symbol) {
  if (favorites.includes(symbol)) {
    favorites = favorites.filter((item) => item !== symbol);
  } else {
    favorites.push(symbol);
  }

  saveFavorites();
  renderCoins();
}

function createCoinRow(coin) {
  const row = document.createElement("tr");
  const favoriteCell = document.createElement("td");
  const favoriteButton = document.createElement("button");
  const symbolCell = document.createElement("td");
  const priceCell = document.createElement("td");
  const changeCell = document.createElement("td");
  const highCell = document.createElement("td");
  const lowCell = document.createElement("td");
  const change = Number(coin.priceChangePercent);

  favoriteButton.className = "favorite-button";
  favoriteButton.textContent = favorites.includes(coin.symbol) ? "★" : "☆";
  favoriteButton.title = "관심항목 추가/삭제";
  favoriteButton.setAttribute("aria-label", `${coin.symbol} 관심항목`);

  if (favorites.includes(coin.symbol)) {
    favoriteButton.classList.add("is-favorite");
  }

  favoriteButton.addEventListener("click", () => toggleFavorite(coin.symbol));

  favoriteCell.appendChild(favoriteButton);
  symbolCell.textContent = coin.symbol;
  symbolCell.className = "symbol";
  priceCell.textContent = formatNumber(coin.lastPrice);
  changeCell.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  changeCell.className = change >= 0 ? "change-up" : "change-down";
  highCell.textContent = formatNumber(coin.highPrice);
  lowCell.textContent = formatNumber(coin.lowPrice);

  row.append(favoriteCell, symbolCell, priceCell, changeCell, highCell, lowCell);
  return row;
}

function renderCoins() {
  const keyword = searchInput.value.trim().toUpperCase();
  const filteredCoins = coins.filter((coin) => {
    const matchesSearch = coin.symbol.includes(keyword);
    const matchesView = currentView === "all" || favorites.includes(coin.symbol);
    return matchesSearch && matchesView;
  });

  list.replaceChildren();

  if (filteredCoins.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = '<td colspan="6" class="empty">표시할 항목이 없습니다.</td>';
    list.appendChild(emptyRow);
    return;
  }

  filteredCoins.forEach((coin) => {
    list.appendChild(createCoinRow(coin));
  });
}

async function fetchCoins() {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("API 요청 실패");

    const data = await response.json();
    coins = data.filter((coin) => coin.symbol.endsWith("USDT"));
    renderCoins();
    status.textContent = `마지막 업데이트: ${new Date().toLocaleTimeString("ko-KR")}`;
  } catch (error) {
    status.textContent = "가격 정보를 불러오지 못했습니다. 잠시 후 다시 시도합니다.";
  }
}

searchInput.addEventListener("input", renderCoins);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentView = tab.dataset.view;
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderCoins();
  });
});

fetchCoins();
setInterval(fetchCoins, 1000);

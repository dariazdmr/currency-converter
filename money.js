const fromSelect = document.querySelector("[name='from_currency']");
const toSelect = document.querySelector("[name='to_currency']");
const endpoint =
  "https://v6.exchangerate-api.com/v6/e1fbccf88f4956a60675385f/latest";
const ratesByBase = {};

const currencies = {
  UAH: "Ukrainian Hryvnya",
  USD: "United States Dollar",
  AUD: "Australian Dollar",
  BGN: "Bulgarian Lev",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  CZK: "Czech Republic Koruna",
  DKK: "Danish Krone",
  GBP: "British Pound Sterling",
  HKD: "Hong Kong Dollar",
  HRK: "Croatian Kuna",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  KRW: "South Korean Won",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  RON: "Romanian Leu",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  TRY: "Turkish Lira",
  ZAR: "South African Rand",
  EUR: "Euro",
};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyAbbr, currencyName]) =>
        `<option value="${currencyAbbr}">${currencyAbbr} - ${currencyName}</option>`
    )
    .join("");
}

async function fetchRates(base = "USD") {
  const res = await fetch(`${endpoint}/${base}`);
  const rates = await res.json();
  return rates;
}

async function convert(amount, from, to) {
  // check if we even have the rates to convert from that currency
  if (!ratesByBase[from]) {
    console.log(
      `Oh nooo, we don't have ${from} to convert ${to}. Lets go and get it!`
    );
  }
  const rates = await fetchRates(from);
  console.log(rates);
  // store them for next time
  ratesByBase[from] = rates;
  // convert the amount that they passed in
  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}

const optionsHTML = generateOptions(currencies);
// populate the options elements
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

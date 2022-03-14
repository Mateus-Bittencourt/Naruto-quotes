export const getQuote = () =>
  fetch('http://127.0.0.1:5000/').then((response) => response.json());

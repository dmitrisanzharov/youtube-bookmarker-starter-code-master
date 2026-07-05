const mainUrl = 'https://www.youtube.com/watch?v=hvPGfcAgk9Y&list=PLPNW_gerXa4OoypUEgZI7uouI12WZrxeS&index=2';

const newUrl = Object.fromEntries(new URL(mainUrl).searchParams.entries());
console.log("newUrl: ", newUrl);
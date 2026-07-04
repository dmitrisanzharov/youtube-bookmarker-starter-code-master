const mainUrl = 'https://www.youtube.com/watch?v=hvPGfcAgk9Y&list=PLPNW_gerXa4OoypUEgZI7uouI12WZrxeS&index=2';

const searchUrl = new URL(mainUrl);
console.log('searchUrl: ', searchUrl);

const searchUrl1 = new URL(mainUrl).searchParams;
console.log('searchUrl1: ', searchUrl1);

const obj = Object.fromEntries(searchUrl1.entries());
console.log("obj: ", obj);
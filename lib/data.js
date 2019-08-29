async function getPageData(updateFn) {
  let isDev = window.location.host.includes("localhost");
  let splitHost = window.location.host.split(".");
  if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
    let page = splitHost[0];
    console.log("page", page);
    let res = await fetch(`/api/get-page?page=${page}`);
    let json = await res.json();
    console.log("json", json);
    updateFn(json);
  } else {
    updateFn(null);
  }
}

const defaultMarkup = `
<h1>Welcome to static.fun!</h1>
<marquee>hack and be merry <3</marquee>
<p>Edit this file and claim your space.</p>
<style>
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  h1 {
    color: salmon;
  }
  marquee {
    width: fit-content;
    background: midnightblue;
    color: springgreen;
    font-family: "Comic Sans MS";
    padding: 10px
  }
</style>
`;

module.exports = {
  getPageData,
  defaultMarkup
};

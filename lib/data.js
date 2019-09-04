async function getPageData(setPageData, href) {
  const { host } = window.location;
  let isDev = host.includes("localhost");
  let splitHost = host.split(".");

  if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
    let page = splitHost[0];
    let res = await fetch(`/api/get-page?page=${page}`);
    let { html, token } = await res.json();
    setPageData({ html, editLink: `${href}?edit=${token}` });
  } else {
    setPageData(null);
  }
}

const defaultMarkup = `
<h1>Welcome to<br> static.fun!</h1>
<marquee>hack and be merry <3</marquee>
<img src="https://media.giphy.com/media/NEVT1WQFlHec8/giphy.gif" />
<style>
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  h1 {
    color: salmon;
    font-size: 64px
  }
  img {
    height: 256px;
    width: auto;
  }
  marquee {
    width: fit-content;
    background: salmon;
    color: black;
    font-family: "Comic Sans MS";
    padding: 10px;
    text-transform: black;
    border: 3px solid black;
  }
  }
</style>
`;

module.exports = {
  getPageData,
  defaultMarkup
};

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

module.exports = {
  getPageData
};

function loadPageAfterDelay(loadTime, url) {
  document.getElementById("load-link").style.display = "none";
  document.getElementById("load-throbber").style.display = "block";
  setTimeout(() => {
    window.location.href = url;
  }, loadTime);
}

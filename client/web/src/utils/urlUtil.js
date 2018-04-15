export function getUrlKey() {
  return "quote_url";
}

export function getUrlConstant() {
  if (isUrlregistered()) {
    return getUrl();
  } else return "";
}

export function isUrlregistered() {
  const url = getUrl();
  if (!url) {
    console.log("NO url!");
    return false;
  }
  return true;
}

export function getUrl() {
  if (window.localStorage) {
    const value = localStorage.getItem(getUrlKey());
    return value ? value : "";
  }
  return "";
}

export function setUrl(newUrl) {
  if (window.localStorage && newUrl) {
    localStorage.setItem(getUrlKey(), newUrl);
  }
}

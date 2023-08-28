const set = (cookieName, cookieValue, expiryDays = 30) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  const expires = "expires=" + expiryDate.toUTCString();
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

const get = (cookieName) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieList = decodedCookie.split(";");

  for (const cookie of cookieList) {
    let trimmedCookie = cookie.trim();
    if (trimmedCookie.indexOf(name) === 0) {
      return trimmedCookie.substring(name.length, trimmedCookie.length);
    }
  }
  return null;
};

const remove = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const CookieUtil = {
  set,
  get,
  remove,
};

export default CookieUtil;

// Function to set the cookies
function setCookie(name, value, days = 1) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=/`;
}

// Function to get cookie
function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(
        cookie.substring(cookieName.length, cookie.length)
      );
    }
  }
  return null;
}

// Function to remove a cookie by name
function removeCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export { setCookie, getCookie, removeCookie };

import Cookies from "js-cookie";

const getAccessToken = () => {
  var token = 0;
  try {
    token = Cookies.getJSON('jwt-example-cookie').access_token;
  } catch(err) {
    console.log('Probably the cookie was removed');
  }
  return token;
}

export { getAccessToken }

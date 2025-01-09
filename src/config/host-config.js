const LOCAL_PORT = 8080;
// const LOCAL_FRONT = 3000;

const clientHostName = window.location.hostname;

let backendHostName;
// let frontendHostName;

if (clientHostName === "localhost") {
    backendHostName = "http://localhost:" + LOCAL_PORT;
    // frontendHostName = "http://localhost:" + LOCAL_FRONT;
} else {
    backendHostName = `http://43.201.20.29:${LOCAL_PORT}`;
}

const API_BASE_URL = backendHostName;

const AUTH = "/auth"
const POST = '/post'

export const AUTH_URL = API_BASE_URL + AUTH;
export const POST_URL = API_BASE_URL + POST;
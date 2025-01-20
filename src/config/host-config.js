const LOCAL_PORT = 8080;
const LOCAL_FRONT = 3000;

const clientHostName = window.location.hostname;

let backendHostName;
let websocketUrl = `ws://localhost:${LOCAL_PORT}`
let frontendHostName;

if (clientHostName === "localhost") {
    backendHostName = "http://localhost:" + LOCAL_PORT;
    frontendHostName = "http://localhost:" + LOCAL_FRONT;
} else {
    websocketUrl = `ws://54.180.8.145:${LOCAL_PORT}`
    backendHostName = `http://54.180.8.145:${LOCAL_PORT}`;
}

const API_BASE_URL = backendHostName;

const AUTH = "/auth"
const POST = '/post'
const CHAT = '/chat'
const NOTICE = '/notice'
const SEARCH = '/search'

export const FRONT_SEARCH_URL = frontendHostName + SEARCH
export const WEBSOCKET_URL = websocketUrl;
export const AUTH_URL = API_BASE_URL + AUTH;
export const POST_URL = API_BASE_URL + POST;
export const CHAT_URL = API_BASE_URL + CHAT;
export const NOTICE_URL = API_BASE_URL + NOTICE;
export const SEARCH_URL = API_BASE_URL + SEARCH;
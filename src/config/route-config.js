import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import MyPage from "../pages/MyPage";
import MapPage from "../pages/Map";
import PostDetail from "../pages/PostDetail";
import WriteForm from "../pages/WriteForm";
import Auth from "../pages/Auth";
import Register from "../pages/Register";
import LoginPage from "../pages/LoginPage";
import ChatRoom from "../pages/ChatRoom";


const authRouter = [
    {
        path: '',
        element: <LoginPage/>,
    },
    {
        path: 'register',
        element: <Register/>
    }
]

const homeRouter = [
    {
        path: '',
        element: <Home/>,
    },
    {
        path: 'chat',
        element: <Chat/>,
    },
    {
        path: 'chat/room', // id붙혀야함
        element: <ChatRoom/>
    },
    {
        path: 'map',
        element: <MapPage/>,
    },
    {
        path: 'info',
        element: <MyPage/>
    },
    {
        path: 'post/:id',
        element: <PostDetail/>
    },
    {
        path: 'write',
        element: <WriteForm/>
    }
]

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <MainPage/>,
                children: homeRouter
            },
            {
                path: 'auth',
                element: <Auth/>,
                children: authRouter
            }
        ]
    }
])
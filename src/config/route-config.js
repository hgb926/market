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


const authRouter = [
    {

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
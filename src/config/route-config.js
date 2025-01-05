import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";


const homeRouter = [

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
            }
        ]
    }
])
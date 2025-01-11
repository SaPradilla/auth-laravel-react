
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RedirectIfAuthenticated from "../guard/RedirectIfAuthenticated";
import RequireAuth from "../guard/RequireAuth";

const routes = [
    {
        path:"/",
        name:'',
        element:
        <RequireAuth>
            <App/>
        </RequireAuth>,
        children:[
            
        ]
    },
    {
        path:"/login",
        name:'Login',
        element:
            <RedirectIfAuthenticated>
                <Login/>
            </RedirectIfAuthenticated>
    }
]



export const router = createBrowserRouter(routes);

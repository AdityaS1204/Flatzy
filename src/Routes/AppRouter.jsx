import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Admin,Home,Listings } from "../Pages";



const AppRouter = createBrowserRouter([
    {
        path:'',
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/fz-admin",
                element:<Admin/>,
            },
            {
                path:"/listings",
                element:<Listings/>,
            }
        ]
    }
])

export default AppRouter
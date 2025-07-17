import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Admin,Home } from "../Pages";



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
            }
        ]
    }
])

export default AppRouter
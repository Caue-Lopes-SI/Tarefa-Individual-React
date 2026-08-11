import Home from "./Pages/Home/index.tsx";
import Login from "./Pages/Login/index.tsx";
import RootLayout from "./RootLayout.tsx";
import { createBrowserRouter } from "react-router-dom";
import Cadastro from "./Pages/Register/index.tsx";
import MovieDetails from "./Pages/Movie/index.tsx";
import { ProtectedRoute } from "./Components/ProtectedRoute/index.tsx";
import MyReviews from "./Pages/MyReviews/index.tsx";
import Favorites from "./Pages/Favorites/index.tsx";
import Watched from "./Pages/Watched/index.tsx";
import UserProfile from "./Pages/UserProfile/index.tsx";
import Search from "./Pages/Search/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      { path: "users/:id", element: <UserProfile /> },
      {element: <ProtectedRoute/>,
        children: [{
            path:"minhas-avaliacoes", element: <MyReviews/>
        },{ path: "minhas-avaliacoes", element: <MyReviews /> },
    { path: "favoritos", element: <Favorites /> },
    { path: "assistidos", element: <Watched /> },]
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
]);

export default router;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import MovieDetails from "../pages/MovieDetails";
import LikedMovies from "../pages/LikedMovies";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/liked" element={<LikedMovies />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
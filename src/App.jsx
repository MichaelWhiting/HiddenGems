import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/topGems">Top Gems</NavLink>
        <NavLink to="/discover">Discover</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </nav>
      </header>
      <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/topGems" element={<TopGems />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

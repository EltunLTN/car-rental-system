import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Clients from "./pages/Clients";
import Rentals from "./pages/Rentals";
import Footer from "./components/Footer/Footer";
import NavbarMobile from "./components/Navbar/NavbarMobile";
import NavbarDesktop from "./components/Navbar/NavbarDesktop";

function App() {
  return (
    <>
      <div className="hidden md:block">
        <NavbarDesktop />
      </div>

      <main className="font-sans">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/rentals" element={<Rentals />} />
        </Routes>
      </main>
      <Footer />
      <div className="md:hidden">
        <NavbarMobile />
      </div>
    </>
  );
}

export default App;

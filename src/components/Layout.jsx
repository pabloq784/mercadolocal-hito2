import { Outlet } from "react-router-dom";
import NavbarPrincipal from "./NavbarPrincipal.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <NavbarPrincipal />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;

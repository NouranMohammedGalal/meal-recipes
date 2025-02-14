import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import MealCategorySelector from "../MealCategorySelector/MealCategorySelector";

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Sidebar />
      <div className="p-4 overflow-hidden sm:ml-64 min-h-screen">
        <div className="container py-8 px-4">
          {!location.pathname.includes("mealdetails") && (
            <MealCategorySelector />
          )}
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

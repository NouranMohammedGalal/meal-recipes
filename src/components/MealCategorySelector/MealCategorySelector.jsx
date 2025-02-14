import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MealLoadingContext } from "../../context/MealLoadingProvider";
import Skeleton from "react-loading-skeleton";

export default function MealCategorySelector() {
  let { isFirstLoad } = useContext(MealLoadingContext);
  let navigate = useNavigate();

  const categories = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    navigate(
      selectedCategory === "All" ? "/" : `/category/${selectedCategory}`
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-[#ca1023c4] to-[#c90519] bg-clip-text text-transparent">
        Learn, Cook, Eat Your Food
      </h1>

      <div className="sm:hidden mt-8">
        <label htmlFor="tabs" className="sr-only">
          Select your category
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ul className="sm:flex hidden mt-8 flex-wrap gap-4 font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {isFirstLoad ? (
          <div className="flex flex-col md:flex-row gap-4">
            {Array(3)
              .fill()
              .map((_, index) => (
                <div key={index} className="flex flex-col items-start">
                  <Skeleton baseColor="#D3D3D3" width={100} height={10} />
                  <Skeleton className="my-1" width={150} height={10} />
                </div>
              ))}
          </div>
        ) : (
          ["All", ...categories].map((category) => (
            <li key={category} className="me-2">
              <NavLink
                to={category === "All" ? "/" : `/category/${category}`}
                className={({ isActive }) =>
                  isActive
                    ? "ctaLink inline-block px-4 py-2 border border-gray-400 transition-all hover:shadow-xl shadow duration-300 rounded-full hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    : "inline-block px-4 py-2 border border-gray-400 transition-all hover:shadow-xl shadow duration-300 rounded-full hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                }
                data-discover="true"
              >
                {category}
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

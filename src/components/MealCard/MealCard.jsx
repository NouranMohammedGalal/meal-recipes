import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { FaFileImage } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { MealLoadingContext } from "../../context/MealLoadingProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MealCard() {
  let { setIsFirstLoad } = useContext(MealLoadingContext);

  let { category } = useParams();
  function getAllData() {
    return axios.get(`${API_BASE_URL}/search.php?s=`);
  }

  function getSpecificData(category) {
    return axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
  }
  let { data, isLoading, error } = useQuery({
    queryKey: ["mealsCategory", category ? category : "All"],
    queryFn: () => (category ? getSpecificData(category) : getAllData()),
  });

  useEffect(() => {
    if (!isLoading) {
      setIsFirstLoad(false);
    }
  }, [isLoading]);

  let meals = data?.data?.meals;

  if (isLoading) {
    return (
      <div className="meals mt-24 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-90 border border-gray-200 p-4">
            <div className="flex flex-col">
              <div className="h-60 bg-gray-200 flex items-center justify-center">
                <FaFileImage className="text-white text-3xl" />
              </div>
              <div className="h-40">
                <Skeleton className="mt-2" height={10} width="80%" />

                <Skeleton className="mt-2" height={10} width="100%" />
                <Skeleton className="mt-2" height={10} width="100%" />
                <Skeleton className="mt-2" height={10} width="100%" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Failed to load meals. Please try again later.
      </div>
    );
  }

  return (
    <div className="meals grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20">
      {meals?.map((meal) => {
        return (
          <div
            key={meal.idMeal}
            className="meal hover:shadow-xl group hover:scale-105 duration-300 transition-all"
          >
            <img
              src={meal.strMealThumb}
              className="w-full group-hover:rotate-[360deg] duration-700 transition-all rounded-full drop-shadow-xl -translate-y-20 shadow-2xl"
              alt={meal.strMeal}
            />
            <h3 className="font-semibold -mt-12 tracking-wider text-xl">
              {meal.strMeal.split(" ").slice(0, 2).join(" ")}
            </h3>
            {!category && (
              <h5 className="flex justify-center items-center gap-2 text-emerald-600">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z" />
                </svg>
                {meal.strArea}
              </h5>
            )}

            <button className="text-white bg-gradient-to-r mt-4 bg-secondary hover:bg-emerald-600 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-2 rounded-full">
              <Link to={`/mealdetails/${meal.idMeal}`} data-discover="true">
                View Recipe
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}

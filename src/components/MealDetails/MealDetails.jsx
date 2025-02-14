import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { FaImage } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MealDetails() {
  const { id } = useParams();

  const fetchMealDetails = async () =>
    await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);

  const { data, isLoading, error } = useQuery({
    queryKey: ["meal", id],
    queryFn: fetchMealDetails,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-4/12 h-50 bg-gray-200 flex items-center justify-center">
          <FaImage className="text-white text-3xl" />
        </div>
        <div className="w-full md:w-7/12 ">
          <Skeleton className="mt-2" height={10} width="50%" />
          <Skeleton className="mt-2" height={10} width="100%" />
          <Skeleton className="mt-2" height={10} width="100%" />

          <Skeleton className="mt-2" height={10} width="85%" />
          <Skeleton className="mt-2" height={10} width="100%" />
          <Skeleton className="mt-2" height={10} width="75%" />
        </div>
      </div>
    );
  }

  if (error || !data?.data?.meals) {
    return (
      <h2 className="text-center text-red-600 font-semibold mt-10">
        Meal Not Found
      </h2>
    );
  }

  const meal = data.data.meals[0];

  return (
    <div className="meal-details flex-col lg:flex-row">
      <div className="lg:w-2/3">
        <h1>{meal.strMeal}</h1>
        <div className="grid gap-4 items-stretch lg:grid-cols-2">
          <div>
            <img
              className="w-full rounded-2xl mb-8"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <ul className="flex gap-4 justify-center">
              <li className="bg-red-600 text-white py-2 px-4 rounded-lg">
                <a
                  className="flex gap-2 justify-center items-center"
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-youtube"> </i>
                  youtube
                </a>
              </li>
              <li className="bg-secondary text-white py-2 px-4 rounded-lg">
                <a
                  className="flex gap-2 justify-center items-center"
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-globe"></i>
                  source
                </a>
              </li>
            </ul>
          </div>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
      <div className="lg:w-1/3 p-4">
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-2xl font-semibold mb-4 border-b-5 border-gray-200 p-2">
            Ingredients
          </h3>
          {Array.from({ length: 7 }).map((_, index) => {
            const ingredient = meal[`strIngredient${index + 1}`];
            const measure = meal[`strMeasure${index + 1}`];
            return (
              ingredient && (
                <div
                  key={index}
                  className="flex justify-between p-2 border-b-3 border-gray-200 last-of-type:border-b-0 "
                >
                  <span className="text-lg">{ingredient}: </span>
                  <span className="text-lg">{measure}</span>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

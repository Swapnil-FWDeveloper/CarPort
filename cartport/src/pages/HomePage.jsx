import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://carport-n1so.onrender.com/api/vehicles")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched cars:", data.vehicles);
        setCars(data.vehicles); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
        setError("Failed to load car listings.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Car Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link
            to={`/car/${car._id}`}
            key={car._id}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={car.main_image}
              alt={car.name}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={car.brand_logo}
                  alt="logo"
                  className="h-5 w-5 object-contain"
                />
                <h2 className="text-xl font-semibold">{car.name}</h2>
              </div>
              <p className="text-gray-500 text-sm">
                {car.category} · {car.condition}
              </p>
              <p className="text-green-600 font-bold mt-1">{car.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

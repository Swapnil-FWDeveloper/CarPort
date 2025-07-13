import { useEffect, useState } from "react";
import {
  Car,
  MapPin,
  Fuel,
  Calendar,
  Star,
  Shield,
  Phone,
  Mail,
  Share2,
  Clock,
  BadgeCheck,
  Store,
  Users,
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  Award,
  CheckCircle,
  Info,
} from "lucide-react";
import { useParams } from "react-router-dom";

function CarSellingPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [viewCount, setViewCount] = useState(
    Math.floor(Math.random() * 500) + 100
  );

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://carport-n1so.onrender.com/api/vehicles"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const foundCar = data.vehicles?.find((c) => c._id === id);

        if (!foundCar) {
          throw new Error("Car not found");
        }

        setCar(foundCar);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const handleContactDealer = () => {
    const phoneNumber = car.dealerPhone || "+91-9999999999";
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleSendMail = () => {
    const subject = encodeURIComponent(
      `Interested in ${car.brand} ${car.name} - CarPort`
    );
    const body = encodeURIComponent(
      `Hi,\n\nI saw your listing for the ${car.brand} ${car.name} (${car.manufacturing_year}) on CarPort and I'm interested in purchasing it.\n\nVehicle Details:\n- Price: ${car.price}\n- Location: ${car.location}\n- Condition: ${car.condition}\n\nPlease get back to me with more details and availability.\n\nThanks.`
    );
    const recipient = "dealer@carport.com";

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const handleShare = async () => {
    const shareData = {
      title: `${car.brand} ${car.name} - CarPort`,
      text: `Check out this ${car.brand} ${car.name} (${car.manufacturing_year}) for ${car.price}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return price;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = typeof rating === "string" ? parseInt(rating) : rating;

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < numRating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const nextImage = () => {
    if (car.gallery_images && car.gallery_images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === car.gallery_images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (car.gallery_images && car.gallery_images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? car.gallery_images.length - 1 : prev - 1
      );
    }
  };

  const getCurrentImage = () => {
    if (car.gallery_images && car.gallery_images.length > 0) {
      return car.gallery_images[currentImageIndex];
    }
    return car.main_image;
  };

  const getAvailabilityBadge = () => {
    if (!car.available) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <Clock className="w-4 h-4 mr-1" />
          Sold Out
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-4 h-4 mr-1" />
        Available
      </span>
    );
  };

  const getConditionBadge = () => {
    const isNew = car.condition === "Brand New";
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          isNew ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
        }`}
      >
        <Award className="w-4 h-4 mr-1" />
        {car.condition}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-fit">
            <Car className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Vehicle Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header Actions */}
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getAvailabilityBadge()}
                  {getConditionBadge()}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-2 rounded-full shadow-md transition duration-200 ${
                      isFavorited
                        ? "bg-red-500 text-white"
                        : "bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image with Gallery Navigation */}
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                {imageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <img
                  src={getCurrentImage()}
                  alt={`${car.brand} ${car.name}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />

                {/* Navigation Arrows */}
                {car.gallery_images && car.gallery_images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {car.gallery_images && car.gallery_images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {car.gallery_images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {car.gallery_images && car.gallery_images.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {car.gallery_images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition duration-200 ${
                          index === currentImageIndex
                            ? "border-blue-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${car.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              {/* Brand Logo */}
              {car.brand_logo && (
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={car.brand_logo}
                    alt={`${car.brand} logo`}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              )}

              {/* Title and Price */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {car.name}
                </h1>
                <p className="text-gray-600 mb-4">
                  {car.manufacturing_year} • {car.category}
                </p>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatPrice(car.price)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="w-4 h-4 mr-1" />
                  {viewCount} views
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {car.years_left}
                  </div>
                  <div className="text-sm text-gray-600">Years Left</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center">
                    {renderStars(car.ncap_rating)}
                  </div>
                  <div className="text-sm text-gray-600">NCAP Rating</div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleContactDealer}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Dealer
                </button>
                <button
                  onClick={handleSendMail}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </button>
              </div>

              {/* Dealership Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Purchase Options
                </h3>
                <div className="space-y-2">
                  {car.dealership_options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Listing Info */}
              <div className="text-sm text-gray-500 border-t pt-4">
                <p className="mb-1">
                  <strong>Listed:</strong> {formatDate(car.createdAt)}
                </p>
                <p className="mb-1">
                  <strong>Updated:</strong> {formatDate(car.updatedAt)}
                </p>
                <p>
                  <strong>ID:</strong> {car.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Detailed Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {car.description}
            </p>
          </div>

          {/* Detailed Specifications */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Vehicle Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">
                    Manufacturing Year
                  </span>
                </div>
                <p className="text-gray-700 text-lg">
                  {car.manufacturing_year}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Fuel className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Fuel Type</span>
                </div>
                <p className="text-gray-700 text-lg">{car.fuel}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Location</span>
                </div>
                <p className="text-gray-700 text-lg">{car.location}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Car className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Category</span>
                </div>
                <p className="text-gray-700 text-lg">{car.category}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <BadgeCheck className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Condition</span>
                </div>
                <p className="text-gray-700 text-lg">{car.condition}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">
                    Years Remaining
                  </span>
                </div>
                <p className="text-gray-700 text-lg">{car.years_left} years</p>
              </div>
            </div>
          </div>

          {/* Safety Rating */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Safety Rating
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      NCAP Safety Rating
                    </h3>
                    <p className="text-gray-600">
                      Global New Car Assessment Programme
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {renderStars(car.ncap_rating)}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {car.ncap_rating}/5
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Information */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Purchase Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Available Options
                </h3>
                <div className="space-y-2">
                  {car.dealership_options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <Store className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Details
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Location:</strong> {car.location}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Availability:</strong>{" "}
                  {car.available ? "Available" : "Sold Out"}
                </p>
                <p className="text-gray-700">
                  <strong>Listing ID:</strong> {car.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarSellingPage;

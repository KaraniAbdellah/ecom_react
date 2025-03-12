import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Card() {
  return (
    <div className="flex justify-center items-center bg-zinc-700 p-3 flex-col">
      <h1 className="text-lg font-semibold text-orange-500">
        🛠️ This feature is currently under development. 🛠️
      </h1>
      <Link to="/">
        <button className="text-gray-600 mt-2 bg-gray-200 p-2 hover:bg-orange-500 hover:text-white rounded-full transition-all">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

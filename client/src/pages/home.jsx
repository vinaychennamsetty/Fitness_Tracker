import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Welcome to Fitness Tracker</h1>
      <div className="mt-4">
        <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded">Login</Link>
      </div>
    </div>
  );
}

export default Home;

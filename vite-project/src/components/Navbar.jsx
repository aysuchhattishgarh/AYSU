import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check login status on component mount and on storage change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Optional: add event listener if you want to update on localStorage changes in other tabs
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#B4EBE6] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo and Heading */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-300"
          >
            <img src="/AYSU.png" alt="AYSU" className="w-12 h-12" />
            <h1 className="text-lg sm:text-xl font-bold leading-tight text-gray-900">
              आदिवासी युवा छात्र संगठन
              <br className="hidden sm:inline" /> छत्तीसगढ़
            </h1>
          </Link>
        </div>

        {/* Hamburger Menu Toggle */}
        <div className="lg:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li>
            <Link to="/">मुखपृष्ठ</Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login">लॉगिन</Link>
              </li>
              <li>
                <Link to="/register">रजिस्टर</Link>
              </li>
            </>
          )}

          <li>
            <Link to="/contact">तकनीकी टीम</Link>
          </li>
          <li>
            <Link to="/admin">उपयोगकर्ता</Link>
          </li>
          <li>
            <Link to="/team">राज्य स्तरीय टीम</Link>
          </li>
          <li>
            <Link to="/team1">संभाग स्तरीय टीम</Link>
          </li>

          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                लॉगआउट
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="lg:hidden flex flex-col items-center bg-[#B4EBE6] space-y-4 py-4 font-medium shadow-md">
          <li>
            <Link to="/" onClick={toggleMenu}>
              मुखपृष्ठ
            </Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  लॉगिन
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleMenu}>
                  रजिस्टर
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/contact" onClick={toggleMenu}>
              तकनीकी टीम
            </Link>
          </li>
          <li>
            <Link to="/admin" onClick={toggleMenu}>
              उपयोगकर्ता
            </Link>
          </li>
          <li>
            <Link to="/team" onClick={toggleMenu}>
              राज्य स्तरीय टीम
            </Link>
          </li>
          <li>
            <Link to="/team1" onClick={toggleMenu}>
              संभाग स्तरीय टीम
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                लॉगआउट
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

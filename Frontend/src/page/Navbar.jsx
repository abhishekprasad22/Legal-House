import React, { useState } from "react";
import { Menu, Scale, X } from "lucide-react"; // Importing icons from Lucide React
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white fixed top-0 left-0 w-full z-50">
            {/* Logo */}
            <div className="flex gap-2 items-center">
                <Scale className="h-8 w-8 text-blue-400" />
                <h1 className="text-xl font-semibold"><Link to="/">Legal House</Link></h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
                {["/", "/create-case", "/view-case", "/resolve-case"].map((path, index) => (
                    <NavLink
                        key={index}
                        to={path}
                        className={({ isActive }) =>
                            `hover:text-blue-500 relative ${isActive ? "text-blue-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500" : ""
                            }`
                        }
                    >
                        {path === "/" ? "Home" : path.replace("-", " ").replace("/", "").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </NavLink>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Navigation Panel (Hidden on md+) */}
            <div
                className={`absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out md:hidden 
                ${isMobileMenuOpen ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col items-center gap-4 py-4">
                    {["/", "/create-case", "/view-case", "/resolve-case"].map((path, index) => (
                        <li key={index}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `block py-2 hover:text-blue-500 relative ${isActive ? "text-blue-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500" : ""
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {path === "/" ? "Home" : path.replace("-", " ").replace("/", "").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

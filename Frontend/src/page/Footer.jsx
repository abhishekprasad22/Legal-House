import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Scale,
  Twitter,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 absolute left-0 text-sm top-full text-white mt-auto w-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-evenly gap-8">

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Legal House</span>
            </div>
            <p className="text-gray-400">
              Empowering legal professionals with modern case management
              solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>JEC,Garmur,785007 </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+91 88128-63574</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>partha2002borah@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 h-0 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Legal House. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

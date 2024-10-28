import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const Header = ({ setiscartOpen, cartItemlength }) => {
  const navigate = useNavigate();
  function gotoHome(){
    navigate("/home");

  }

  function gotoCart() {
    setiscartOpen((prev) => !prev);
  }
  console.log(cartItemlength);
  return (
    <div className="flex justify-between py-5 items-center px-5">
      <div>
        <h1
          className="text-2xl font-extrabold text-orange-600 cursor-pointer"
          onClick={() => {
            setiscartOpen(false);
          }}
        >
          Tomato.
        </h1>
      </div>
      <div>
        <ul className="flex gap-3 text-lg font-semibold">
          <div onClick={() => {gotoHome}}>
            <li className="hover:text-orange-500 cursor-pointer">Home</li>
          </div>
          <li className="hover:text-orange-500 cursor-pointer">Menu</li>
          <li className="hover:text-orange-500 cursor-pointer">Contact Us</li>
        </ul>
      </div>
      <div className="flex gap-3">
        <SearchIcon sx={{ fontSize: "2rem", color: "#333" }} />
        <FavoriteIcon sx={{ fontSize: "2rem", color: "#333" }} />
        <div className="relative cursor-pointer" onClick={gotoCart}>
          <ShoppingCartIcon sx={{ fontSize: "2rem", color: "#333" }} />
          <div className="h-5 w-5 rounded-full bg-orange-500 absolute -top-2 right-0 border border-white left-4">
          <p className=" text-white font-bold s text-sm text-center">
            {cartItemlength || 0}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

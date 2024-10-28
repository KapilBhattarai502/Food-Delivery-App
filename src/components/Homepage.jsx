import React, { useEffect, useState, useRef } from "react";
import foodMenu from "../data/Data";
import FoodCard from "./FoodCard";
import Menu from "./Menu";
import SearchIcon from "@mui/icons-material/Search";

import Filter from "./Filter";

const Homepage = ({ cartItems, setCartItems }) => {
  const [foodItems, setFoodItems] = useState(foodMenu);
  const [searchItems, setSearchItems] = useState({
    searchText: "",
    searchType: null,
  });
  //   const [cartItems, setCartItems] = useState([]);
  const inputref = useRef(null);

  useEffect(() => {
    inputref.current.style.outline = "none";
  }, []);

  function handleSearchText(event) {
    setSearchItems({ searchText: event.target.value });
  }

  const filteredItems = foodItems.filter((item) => {
    const filterText = item.name.includes(searchItems.searchText);
    const filterType = searchItems.searchType
      ? item.type.includes(searchItems.searchType)
      : true;

    return filterText && filterType;
  });

  console.log(searchItems);
  return (
    <div>
      <div className="h-[40rem]">
        <img
          src="https://wallpapers.com/images/featured/food-4k-1pf6px6ryqfjtnyr.jpg"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="py-4">
        <h2 className="font-bold">Explore Our Menus</h2>
        <p>
          Chosse from our diverse menu featuring a delectable array of
          dishes.Our mission to satisfy your cravings and elevate your dining
          expeirence,one delicious meal at a time
        </p>
      </div>
      <div className="grid grid-flow-col auto-cols-max gap-4 overflow-scroll pb-6">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
          <Menu key={index} />
        ))}
      </div>
      <div>
        <div className="">
          <div className="border-emerald-500 border-2 p-2 flex rounded-lg items-center flex-grow">
            <SearchIcon className="cursor-pointer" />

            <input
              ref={inputref}
              type="text"
              placeholder="Search here"
              className="w-full"
              onChange={handleSearchText}
            ></input>
          </div>
          <div className="flex flex-row-reverse">
            {/* <FilterListIcon className="cursor-pointer" /> */}
            <Filter setSearchItems={setSearchItems} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {filteredItems.map((item) => {
            return (
              <FoodCard
                key={item.id}
                item={item}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

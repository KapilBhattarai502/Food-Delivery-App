import React from "react";

const Menu = () => {
  return (
    <div className="cursor-pointer">
    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
      <img
        src="https://i.pinimg.com/enabled_lo/474x/e8/35/ed/e835ed89023c2a6d2d1933321d59efc4.jpg"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
    <h4 className="text-center">Momo</h4>
    </div>
  );
};

export default Menu;

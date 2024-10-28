import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

const Cart = ({ cartItems, setCartItems }) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  console.log(total);

  return (
    <div className="w-full max-w-7xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4 text-center">Cart Items</h2>

      {cartItems && cartItems.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 p-2">Item</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems?.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">${item.price}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">
                  ${item.price * item.quantity}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600"
                    onClick={() => {
                      const updatedCart = cartItems.filter(
                        (cartItem) => cartItem !== item
                      );
                      setCartItems(updatedCart);
                    }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-red-500 mt-4 ">
          Your cart is empty !!!.
        </p>
      )}

      {cartItems?.length > 0 && (
        <div className="mt-20">
          <h2 className="font-semibold">Cart Totals</h2>
          <div className="flex justify-between mt-3">
            <p className=" text-sm font-serif">Subtotal</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className=" text-sm font-serif">Delivery Charge</p>
            <p>$5</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className=" text-sm font-serif font-semibold opacity-80">
              Total
            </p>
            <p>${total.toFixed(2) + 5}</p>
          </div>

          <button className=" bg-orange-400 py-2 px-5 rounded-md mt-3 text-white">PROCEED TO CHECKOUT</button>
        </div> 
    
      )}
    
    </div>
  );
};

export default Cart;

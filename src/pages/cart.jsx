import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, selectOrderSummary, removeFromCart, updateQuantity } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../components/toaster';
import DeleteButton from '../components/DeleteButton';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const summary = useSelector(selectOrderSummary);
  const navigate = useNavigate();
  const [toaster, setToaster] = useState(null);

  const showToaster = (message) => {
    setToaster(message);
    setTimeout(() => setToaster(null), 3000);
  };

  return (
    <div className="container md:px-10 px-3 py-12 max-w-screen-2xl">
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-block bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-900"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="p-6 ">
            <div className="grid gap-6">
              {cart.map((item, index) => (
                <div key={item.id} className="bg-white rounded-lg p-5 h-35 shadow-sm">
                  <div className="flex items-start gap-4">
                    <DeleteButton
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                        showToaster(`${item.title} removed from cart`);
                      }}
                    />
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-25 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                          <h3 className="font-semibold text-lg break-words">{item.title}</h3>
                          <span className="text-xs font-medium">Price: ${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">QTY:</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => dispatch(updateQuantity({ productId: item.id, newQuantity: item.quantity - 1 }))}
                                className="w-6 h-6 bg-red-800 text-white rounded-full flex items-center justify-center hover:bg-red-900 text-xs flex-shrink-0"
                              >
                                -
                              </button>
                              <span className="px-2 min-w-[2rem] text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => dispatch(updateQuantity({ productId: item.id, newQuantity: item.quantity + 1 }))}
                                className="w-6 h-6 bg-red-800 text-white rounded-full flex items-center justify-center hover:bg-red-900 text-xs flex-shrink-0"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <span className="font-bold text-lg text-red-800">Total: ${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 bg-white mx-6 p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-2xl text-red-800 font-bold">Order Summary</h2>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Voucher Code" className="px-2 py-1 border rounded text-md" />
                <button className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-900 text-md">Apply</button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${summary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${summary.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t mt-6 pt-2">
                <span>Total</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => {
                    navigate('/payment');
                    showToaster('Proceeding to delivery address...');
                  }}
                  className="bg-red-800 text-white px-10 py-2.5 rounded-md hover:bg-red-900 text-sm"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toaster && <Toaster message={toaster} onClose={() => setToaster(null)} />}

    </div>
  );
}

export default Cart;

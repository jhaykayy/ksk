import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [orderData] = useState({
    orderId: "ORD-" + Date.now(),
    createdAt: new Date().toLocaleDateString(),
    items: [
      {
        id: 1,
        name: "Beefy Meat",
        price: 30,
        quantity: 2,
        image: "beef.jpeg",
      },
      {
        id: 2,
        name: "Chicken Meat",
        price: 60,
        quantity: 1,
        image: "chicken.jpeg",
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      city: "Lagos",
      country: "Nigeria",
      phone: "+234 801 234 5678",
    },
    totalPrice: 150,
    estimatedDelivery: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    paymentMethod: "Bank Transfer",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FiCheckCircle className="text-5xl text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your order. Your payment has been received.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          {/* Order ID and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                Order Number
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {orderData.orderId}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                Order Date
              </p>
              <p className="text-lg text-gray-800">{orderData.createdAt}</p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="mb-8 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-gray-800">
                Estimated Delivery:
              </span>{" "}
              {orderData.estimatedDelivery}
            </p>
            <p className="text-sm text-gray-500">
              You will receive tracking information via email/SMS
            </p>
          </div>

          {/* Order Items */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden shrink-0">
                      <img
                        src={`/src/assets/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Shipping Address
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-800 font-medium">
                {orderData.shippingAddress.firstName}{" "}
                {orderData.shippingAddress.lastName}
              </p>
              <p className="text-gray-700">
                {orderData.shippingAddress.address}
              </p>
              <p className="text-gray-700">
                {orderData.shippingAddress.city},{" "}
                {orderData.shippingAddress.country}
              </p>
              <p className="text-gray-700 mt-2">
                Phone: {orderData.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">
                ₦
                {orderData.items
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">Free</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-orange-700">
                ₦{orderData.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-4 bg-green-50 rounded border border-green-200 mb-8">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-gray-800">
                Payment Method:
              </span>{" "}
              {orderData.paymentMethod}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Status:</span> Paid
              ✓
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/my-orders")}
              className="flex-1 border border-gray-300 text-gray-800 py-3 rounded font-medium hover:bg-gray-50 transition"
            >
              View All Orders
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-2">Have questions about your order?</p>
          <a href="#" className="text-orange-700 font-semibold hover:underline">
            Contact Our Support Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

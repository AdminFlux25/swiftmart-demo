import { useState } from "react";
import Chatbot from "./components/chatbot";

const currency = "S$";
const productsData = [
  { id: 1, name: "Organic Milk", category: "Dairy", price: 6 },
  { id: 2, name: "Brown Bread", category: "Bakery", price: 4 },
  { id: 3, name: "Basmati Rice (1kg)", category: "Grains", price: 8 },
  { id: 4, name: "Eggs (12 pack)", category: "Dairy", price: 7 },

  { id: 5, name: "Tomatoes (1kg)", category: "Vegetables", price: 3 },
  { id: 21, name: "Onions (1kg)", category: "Vegetables", price: 2.9 },
  { id: 22, name: "Green Chillies (100g)", category: "Vegetables", price: 0.4 },
  { id: 23, name: "Ginger (250g)", category: "Vegetables", price: 1 },
  { id: 24, name: "Garlic (500g)", category: "Vegetables", price: 1 },
  { id: 25, name: "Lettuce (500g)", category: "Vegetables", price: 2 },

  { id: 6, name: "Chickpeas (1kg)", category: "Pantry", price: 2.0 },
  { id: 7, name: "Sunflower Oil (1kg)", category: "Pantry", price: 6.4 },
  { id: 13, name: "Brown Sugar (1kg)", category: "Pantry", price: 5.4 },
  { id: 15, name: "Coconut Oil (1kg)", category: "Pantry", price: 7.2 },

  { id: 8, name: "Cheddar Cheese (200g)", category: "Dairy", price: 5.5 },

  { id: 9, name: "Whole Wheat Bread (1kg)", category: "Bakery", price: 5.2 },
  { id: 14, name: "Nonya Kaya", category: "Bakery", price: 4.0 },

  { id: 10, name: "Vitamin B-Complex", category: "Supplements", price: 4.4 },
  { id: 11, name: "Glucosamine and Chondritin", category: "Supplements", price: 9.5 },
  { id: 12, name: "Melatonin", category: "Supplements", price: 8.1 },

  { id: 16, name: "Chips (80g)", category: "Snacks", price: 1.0 },
  { id: 17, name: "Kinder Joy", category: "Snacks", price: 0.8 },
  { id: 18, name: "Kit Kat Chunky", category: "Snacks", price: 0.9 },
  { id: 19, name: "Ritz Biscuits", category: "Snacks", price: 2.0 },
  { id: 20, name: "Cadbury Dairy Milk Chocolate", category: "Snacks", price: 2.2 },
];

const familyMembers = [
  { id: 1, name: "Jason", icon: "👨" },
  { id: 2, name: "Brenda", icon: "👩" },
  { id: 3, name: "Steve", icon: "🧒" },
];

function App() {
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [carts, setCarts] = useState({});

  const addToCart = (product) => {
    const memberCart = carts[selectedMember.id] || [];
    setCarts({
      ...carts,
      [selectedMember.id]: [...memberCart, product],
    });
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = currentCart.filter((_, index) => index !== indexToRemove);
    setCarts({
      ...carts,
      [selectedMember.id]: updatedCart,
    });
  };

  const clearMemberCart = () => {
    setCarts({
      ...carts,
      [selectedMember.id]: [],
    });
  };

  const clearAllCarts = () => {
    setCarts({});
  };

  const currentCart = carts[selectedMember.id] || [];
  const totalAmount = currentCart.reduce((sum, item) => sum + item.price, 0);

  const allItems = Object.values(carts).flat();
  const totalHouseholdAmount = allItems.reduce((sum, item) => sum + item.price, 0);

  const categories = [...new Set(productsData.map(p => p.category))];

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>🛒 WiseKart</h1>
      <p>Smart Family Shopping Experience</p>

      {/* Member Selection */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
        {familyMembers.map(member => (
          <button
            key={member.id}
            onClick={() => setSelectedMember(member)}
            style={{
              padding: "10px 18px",
              backgroundColor:
                selectedMember.id === member.id ? "#4CAF50" : "#f2f2f2",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          >
            {member.icon} {member.name}
          </button>
        ))}
      </div>

      {/* Products */}
      {categories.map(category => (
        <div key={category} style={{ marginBottom: "30px" }}>
          <h2>{category}</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {productsData
              .filter(p => p.category === category)
              .map(product => (
                <div key={product.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    borderRadius: "10px",
                    width: "180px"
                  }}
                >
                  <h4>{product.name}</h4>
                  <p>{currency}{product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Individual Cart */}
      <h2>🛒 {selectedMember.name}'s Cart</h2>

      {currentCart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {currentCart.map((item, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
              <span>{item.name} - {currency}{item.price.toFixed(2)}</span>
              <button onClick={() => removeFromCart(index)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>
                ❌
              </button>
            </div>
          ))}
          <h3>Total: {currency}{totalAmount.toFixed(2)}</h3>
          <button onClick={clearMemberCart} style={{ marginTop: "10px", backgroundColor: "#d32f2f", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px" }}>
            Clear {selectedMember.name}'s Cart
          </button>
        </>
      )}

      {/* Household Cart */}
      <h2 style={{ marginTop: "40px" }}>🏠 Total Household Cart</h2>

      {allItems.length === 0 ? (
        <p>No household items yet.</p>
      ) : (
        <>
          {allItems.map((item, index) => (
            <p key={index}>
              {item.name} - {currency}{item.price.toFixed(2)}
            </p>
          ))}
          <h3>Total Household Spend: {currency}{totalHouseholdAmount.toFixed(2)}</h3>
          <button onClick={clearAllCarts} style={{ marginTop: "10px", backgroundColor: "black", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px" }}>
            Clear Entire Household Cart
          </button>
        </>
      )}
      <div
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "320px",
    height: "420px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }}
>
  <div style={{ flex: 1 }}>
    <Chatbot />
  </div>
</div></div>
  )
};

export default App;
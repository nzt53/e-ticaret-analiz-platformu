import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, { ...formData, id: data.id }]);
        setFormData({ name: "", price: "", description: "" });
      });
  };

  return (
    <div>
      <h1>E-Ticaret Ürün Yönetimi</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ürün Adı"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <textarea
          placeholder="Açıklama"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <button type="submit">Ekle</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}₺ - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
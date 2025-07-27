import React, { useState, useEffect } from 'react';

const categories = [
  'Vegetables',
  'Grains',
  'Oils',
  'Spices',
  'Dairy',
  'Beverages',
  'Non-Veg',
  'Other',
];

const API_URL = 'http://localhost:3001';

export default function Supplier() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
    images: [],
    video: '',
    inStock: true,
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch existing products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle image uploads (local preview only)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setForm({ ...form, images: files });
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  // Handle video upload (local preview only)
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, video: file });
    setPreviewVideo(file ? URL.createObjectURL(file) : null);
  };

  // Handle form submit (save to JSON Server)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description || !form.stock || !form.category) {
      setError('Please fill all required fields (Name, Price, Description, Stock, Category).');
      return;
    }

    setLoading(true);
    try {
      // Handle image uploads properly
      let finalImages = [];
      
      if (form.images && form.images.length > 0) {
        // Convert uploaded files to base64
        const imagePromises = form.images.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        });
        
        finalImages = await Promise.all(imagePromises);
      } else {
        // Use default image if no images uploaded
        finalImages = [
          "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400&q=80"
        ];
      }

      const productData = {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        stock: parseInt(form.stock),
        category: form.category,
        images: finalImages,
        video: "",
        inStock: form.inStock,
        mediaIndex: 0,
        rating: 0,
        ratingsCount: 0,
        createdAt: new Date().toISOString(),
      };

      console.log('Sending product data:', productData);

      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const newProduct = await response.json();
        console.log('New product created:', newProduct);
        setListings([newProduct, ...listings]);
        setForm({ name: '', price: '', description: '', stock: '', category: '', images: [], video: '', inStock: true });
        setPreviewImages([]);
        setPreviewVideo(null);
        setError('');
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        setError(`Failed to add product. Server responded with: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError(`Failed to add product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Slider controls
  const handlePrevMedia = (prod) => {
    setListings(listings.map(item =>
      item.id === prod.id
        ? { ...item, mediaIndex: (item.mediaIndex - 1 + getMediaCount(item)) % getMediaCount(item) }
        : item
    ));
  };
  const handleNextMedia = (prod) => {
    setListings(listings.map(item =>
      item.id === prod.id
        ? { ...item, mediaIndex: (item.mediaIndex + 1) % getMediaCount(item) }
        : item
    ));
  };
  const getMediaCount = (prod) => {
    let count = 0;
    if (prod.images && prod.images.length > 0) count += prod.images.length;
    if (prod.video) count += 1;
    return count;
  };
  const renderMedia = (prod) => {
    const media = [];
    if (prod.images && prod.images.length > 0) {
      prod.images.forEach((src) => media.push({ type: 'image', src }));
    }
    if (prod.video) {
      media.push({ type: 'video', src: prod.video });
    }
    if (media.length === 0) return null;
    const current = media[prod.mediaIndex || 0];
    if (current.type === 'image') {
      return <img src={current.src} alt="Preview" className="h-32 w-full object-cover rounded border mb-2" />;
    } else {
      return <video src={current.src} controls className="h-32 w-full rounded mb-2" />;
    }
  };

  // Handle delete listing
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setListings(listings.filter(item => item.id !== id));
      } else {
        setError('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again.');
    }
  };

  // Handle toggle in stock
  const handleToggleStock = async (id) => {
    const product = listings.find(item => item.id === id);
    if (!product) return;

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inStock: !product.inStock }),
      });
      if (response.ok) {
        setListings(listings.map(item => item.id === id ? { ...item, inStock: !item.inStock } : item));
      } else {
        setError('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Supplier: Add Raw Material</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block font-bold text-black mb-1">Product Name *</label>
            <input id="name" type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded text-black" required />
          </div>
          <div>
            <label htmlFor="price" className="block font-bold text-black mb-1">Price per unit (₹) *</label>
            <input id="price" type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded text-black" min="0" required />
          </div>
          <div>
            <label htmlFor="stock" className="block font-bold text-black mb-1">Stock Quantity *</label>
            <input id="stock" type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full p-2 border rounded text-black" min="0" required />
          </div>
          <div>
            <label htmlFor="category" className="block font-bold text-black mb-1">Category *</label>
            <select id="category" name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded text-black" required>
              <option value="">Select category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block font-bold text-black mb-1">Short Description *</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded text-black" required />
        </div>
        <div>
          <label htmlFor="images" className="block font-bold text-black mb-1">Upload Images (1–3) (Optional)</label>
          <input id="images" type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full text-black" />
          <div className="flex gap-2 mt-2">
            {previewImages.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" className="h-16 w-16 object-cover rounded border" />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="video" className="block font-bold text-black mb-1">Upload Video (optional)</label>
          <input id="video" type="file" accept="video/*" onChange={handleVideoChange} className="w-full text-black" />
          {previewVideo && (
            <video src={previewVideo} controls className="h-24 mt-2 rounded" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <input id="inStock" type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
          <label htmlFor="inStock" className="font-bold text-black bg-white px-2 py-1 rounded">In Stock</label>
        </div>
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold w-full disabled:bg-gray-400">
          {loading ? 'Processing Images & Adding Product...' : 'Add Product'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products added yet.</div>
        )}
        {listings.map((prod) => (
          <div key={prod.id} className="bg-white rounded-lg shadow p-4 flex flex-col relative">
            <div className="mb-2 flex flex-col items-center">
              {getMediaCount(prod) > 1 && (
                <div className="flex justify-between w-full mb-1">
                  <button type="button" onClick={() => handlePrevMedia(prod)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
                  <button type="button" onClick={() => handleNextMedia(prod)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
                </div>
              )}
              {renderMedia(prod)}
            </div>
            <h3 className="text-xl font-semibold mb-1">{prod.name}</h3>
            <div className="text-gray-500 text-sm mb-1">{prod.category}</div>
            <p className="text-gray-600 mb-2">{prod.description}</p>
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-lg">₹{prod.price}</div>
              <div className="text-sm">Stock: {prod.stock}</div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${prod.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{prod.inStock ? 'In Stock' : 'Out of Stock'}</span>
              <button onClick={() => handleToggleStock(prod.id)} className="text-xs underline text-blue-600">Toggle</button>
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleDelete(prod.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
              {/* Edit button can be implemented later */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

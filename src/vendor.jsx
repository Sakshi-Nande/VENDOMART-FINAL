import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001';

export default function Vendor() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [materials, setMaterials] = useState([]);
  const [cart, setCart] = useState([]);
  const [userRatings, setUserRatings] = useState({}); // { materialId: rating }
  const [loading, setLoading] = useState(true);

  // Fetch products from JSON Server on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories for filter with fallback
  const existingCategories = [...new Set(materials.map(mat => mat.category))];
  const allCategories = [
    'Vegetables',
    'Grains', 
    'Oils',
    'Spices',
    'Dairy',
    'Beverages',
    'Non-Veg',
    'Other'
  ];
  
  // Combine existing categories with fallback categories
  const categories = [...new Set([...existingCategories, ...allCategories])];

  // Filter materials by search and category
  const filteredMaterials = materials
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((mat) => {
      // Category filter
      if (selectedCategory && mat.category !== selectedCategory) return false;
      
      // Search filter
      if (!search.trim()) return true;
      const searchTerm = search.toLowerCase();
      return (
        mat.name.toLowerCase().includes(searchTerm) ||
        mat.description.toLowerCase().includes(searchTerm) ||
        mat.category.toLowerCase().includes(searchTerm) ||
        mat.price.toString().includes(searchTerm)
      );
    });

  // Handle buy
  const handleBuy = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
      alert('Added to cart! (Demo only)');
    }
  };

  // Handle rating
  const handleRating = async (id, rating) => {
    setUserRatings({ ...userRatings, [id]: rating });
    
    // Update the product rating in the database
    try {
      const product = materials.find(mat => mat.id === id);
      if (product) {
        const newRating = ((product.rating || 0) * (product.ratingsCount || 0) + rating) / ((product.ratingsCount || 0) + 1);
        const newRatingsCount = (product.ratingsCount || 0) + 1;
        
        await fetch(`${API_URL}/products/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating: parseFloat(newRating.toFixed(1)),
            ratingsCount: newRatingsCount,
          }),
        });
        
        // Update local state
        setMaterials(prev =>
          prev.map((mat) =>
            mat.id === id
              ? {
                  ...mat,
                  rating: parseFloat(newRating.toFixed(1)),
                  ratingsCount: newRatingsCount,
                }
              : mat
          )
        );
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  // Slider controls
  const handlePrevMedia = (mat) => {
    setMaterials(materials.map(item =>
      item.id === mat.id
        ? { ...item, mediaIndex: (item.mediaIndex - 1 + getMediaCount(item)) % getMediaCount(item) }
        : item
    ));
  };
  const handleNextMedia = (mat) => {
    setMaterials(materials.map(item =>
      item.id === mat.id
        ? { ...item, mediaIndex: (item.mediaIndex + 1) % getMediaCount(item) }
        : item
    ));
  };
  const getMediaCount = (mat) => {
    let count = 0;
    if (mat.images && mat.images.length > 0) count += mat.images.length;
    if (mat.video) count += 1;
    return count;
  };
  const renderMedia = (mat) => {
    const media = [];
    if (mat.images && mat.images.length > 0) {
      mat.images.forEach((src) => media.push({ type: 'image', src }));
    }
    if (mat.video) {
      media.push({ type: 'video', src: mat.video });
    }
    if (media.length === 0) return null;
    const current = media[mat.mediaIndex || 0];
    if (current.type === 'image') {
      return <img src={current.src} alt={mat.name} className="h-40 w-full object-cover rounded mb-2" />;
    } else {
      return <video src={current.src} controls className="h-40 w-full object-cover rounded mb-2" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Vendor Marketplace</h1>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by name, description, category, or price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {(search || selectedCategory) && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('');
            }}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Clear filters
          </button>
        )}
      </div>
      {search && (
        <div className="mb-4 text-sm text-gray-600">
          Found {filteredMaterials.length} item{filteredMaterials.length !== 1 ? 's' : ''} for "{search}"
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            {materials.length === 0 ? 'No products available yet.' : 'No materials found.'}
          </div>
        )}
        {filteredMaterials.map((mat) => (
          <div key={mat.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <div className="mb-2 flex flex-col items-center">
              {getMediaCount(mat) > 1 && (
                <div className="flex justify-between w-full mb-1">
                  <button 
                    type="button" 
                    onClick={() => handlePrevMedia(mat)} 
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm shadow-md transition-colors duration-200"
                  >
                    ← Prev
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleNextMedia(mat)} 
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm shadow-md transition-colors duration-200"
                  >
                    Next →
                  </button>
                </div>
              )}
              {renderMedia(mat)}
            </div>
            <h2 className="text-xl font-semibold mb-1">{mat.name}</h2>
            <div className="text-gray-500 text-sm mb-1">{mat.category}</div>
            <p className="text-gray-600 mb-2">{mat.description}</p>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-medium">{mat.rating || 0}</span>
              <span className="text-gray-400 ml-2 text-sm">({mat.ratingsCount || 0} ratings)</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-lg">₹{mat.price}</div>
              <div className="text-sm">Stock: {mat.stock}</div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${mat.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {mat.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <button
              onClick={() => handleBuy(mat.id)}
              disabled={!mat.inStock || cart.includes(mat.id)}
              className={`mb-2 px-4 py-2 rounded text-white ${
                !mat.inStock 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : cart.includes(mat.id) 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {!mat.inStock ? 'Out of Stock' : cart.includes(mat.id) ? 'Added to Cart' : 'Buy'}
            </button>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(mat.id, star)}
                  className={`text-xl ${userRatings[mat.id] >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
              {userRatings[mat.id] && (
                <span className="ml-2 text-sm text-green-600">You rated: {userRatings[mat.id]}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




import React, { useEffect, useMemo, useState } from 'react';
import { brandPageStyles } from '../assets/dummyStyles.js';
import { useNavigate, useParams } from 'react-router-dom';
import watchesData from '../assets/Categoriesdata.js';
import { useCart } from './CartContext.jsx';
import { ArrowLeft, Minus, Plus } from 'lucide-react';

const BrandPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const { addItem, cart, increament, decreament } = useCart();

  const [search, setSearch] = useState("");

  const brandKey = brandName?.toLowerCase();

  // 🔥 Clean brand name
  const formattedBrand = brandName
    ?.replace(/-/g, ' ')
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  const brandWatches =
    Object.entries(watchesData).find(
      ([key]) => key.toLowerCase() === brandKey
    )?.[1] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const findInCart = (id) => cart.find((p) => p.id === id);

  const filteredWatches = useMemo(() => {
    return brandWatches.filter((watch) =>
      watch.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [brandWatches, search]);

  // Empty Brand State
  if (!brandWatches.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wide">
          No Watches Found
        </h2>
        <p className="text-gray-500 mt-2">
          This brand might not exist or data mismatch happened.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-black text-white flex items-center gap-2 rounded-lg hover:scale-105 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={brandPageStyles.mainContainer}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-8">

          {/* Top Row */}
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:scale-105 transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>

            <input
              type="text"
              placeholder="Search watch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-48 md:w-72 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-center">
            {formattedBrand} Collection
          </h1>

        </div>

        {/* Grid */}
        <div className={brandPageStyles.grid}>
          {filteredWatches.map((watch) => {
            const inCart = findInCart(watch.id);

            return (
              <div
                key={watch.id}
                className={`${brandPageStyles.card} transform hover:-translate-y-2 hover:shadow-xl transition duration-300`}
              >

                <div className={brandPageStyles.imageContainer}>
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className={brandPageStyles.detailsContainer}>
                  <h2 className="font-semibold text-lg">
                    {watch.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {watch.desc}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="font-bold text-lg">
                      {watch.price}
                    </p>

                    {inCart ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreament(watch.id)}
                          className="p-2 border rounded hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>

                        <span>{inCart.qty}</span>

                        <button
                          onClick={() => increament(watch.id)}
                          className="p-2 border rounded hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: watch.id,
                            name: watch.name,
                            price: watch.price,
                            img: watch.image,
                            qty: 1
                          })
                        }
                        className="px-3 py-1 bg-black text-white rounded hover:scale-105 transition"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredWatches.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No results match your search.
          </p>
        )}

      </div>
    </div>
  );
};

export default BrandPage;
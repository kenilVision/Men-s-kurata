import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShipping } from '../Store/slice/shippingSlice'; 

const baseURL = import.meta.env.VITE_STRIPE_imgUrl;

 const Shipping = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.shipping);

  useEffect(() => {
    dispatch(fetchShipping());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  const shippingItems = data?.data || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-17.5">
      {shippingItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center text-center p-4  "
        >
          {item.svg?.url && (
            <img
              src={baseURL + item.svg.url}
              alt={item.title}
              className="w-16 h-16 object-contain mb-2"
            />
          )}
          <h3 className="text-base font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Shipping;
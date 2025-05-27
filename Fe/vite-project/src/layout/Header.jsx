import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeader } from '../Store/slice/headerSlice'; // Adjust path
import { Search } from 'lucide-react'; // ✅ Proper import


const Header = () => {
  const dispatch = useDispatch();
  const { data: headerData, loading } = useSelector((state) => state.header);

  useEffect(() => {
    dispatch(fetchHeader());
  }, [dispatch]);

  if (loading || !headerData) return null;

  const {
    searchPlaceholder,
    wishlistText,
    logo,
    WishlistLog,
    cartLogo,
  } = headerData;

  const baseURL = import.meta.env.VITE_STRIPE_imgUrl;

  return (
    <div className="flex items-center justify-between py-4 px-17.5 border-b border-[#F2F2F2]">
           <div className="flex items-center gap-2 relative">
        <Search
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer focus-ring-none"
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="pl-8 pr-2 py-1 rounded focus-ring-none outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <img src={baseURL + logo?.url} alt="Logo" className="h-10 object-contain w-50 h-17"/>
        
      </div>

     <div className="flex  items-center gap-6">
  {/* Wishlist */}
  <div className="flex items-center gap-2 text-sm">
    <div className="relative">
      <img src={baseURL + WishlistLog?.url} alt="Wishlist" className="h-6 w-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
        0
      </span>
    </div>
    <span>{wishlistText}</span>
  </div>

  {/* Cart */}
  <div className="flex items-center gap-2 text-sm">
    <div className="relative">
      <img src={baseURL + cartLogo?.url} alt="Cart" className="h-6 w-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
        0
      </span>
    </div>
    <span>$164.00</span>
  </div>
</div>

    </div>
  );
};

export default Header;

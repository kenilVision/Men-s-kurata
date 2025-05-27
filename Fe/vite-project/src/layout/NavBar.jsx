import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNavBar } from '../Store/slice/navBarSlice'; // adjust path
import { Link, useLocation } from 'react-router-dom';

const TopNav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, loading } = useSelector((state) => state.navBar);

  useEffect(() => {
    dispatch(fetchNavBar());
  }, [dispatch]);

  if (loading || !data) return null;

  const { PromotionText, navLinks } = data;

  return (
    <div className="flex justify-between py-9.5 px-17.5 text-sm bg-white font-medium">
      <div className="flex gap-8">
        {navLinks.map((item) => {
          const isActive = location.pathname === item.Link;

          return (
            <Link
              key={item.id}
              to={item.Link}
              className={`relative group text-base transition ${
                isActive ? 'text-[#b88451]' : 'text-black hover:text-[#b88451]'
              }`}
            >
              {item.Title}
              <span
                className={`block h-0.5 bg-[#b88451] transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          );
        })}
      </div>

      <div className="text-black font-semibold text-base uppercase">{PromotionText}</div>
    </div>
  );
};

export default TopNav;


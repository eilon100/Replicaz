import React from 'react';
import MenuDrawer from './components/MenuDrawer';
import SearchBar from './components/SearchBar';
import { useRouter } from 'next/router';
import SiteLogo from './components/SiteLogo';
import UserProfile from './components/UserProfile';
import PageNavigation from './components/PageNavigation';
import Notifications from './components/notifications/NotificationsBox';

function Header() {
  const router = useRouter();
  const isAuthPage = router.pathname.includes('auth');

  return !isAuthPage ? (
    <div
      className={`sticky top-0 z-50 flex justify-center items-center pl-16 pr-2 lg:pr-7 sm:pl-24 py-5 h-20 bg-main shadow-sm `}
    >
      <SiteLogo />
      <PageNavigation />
      <SearchBar />
      <Notifications />
      <UserProfile />
      <div className="lg:hidden">
        <MenuDrawer />
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Header;

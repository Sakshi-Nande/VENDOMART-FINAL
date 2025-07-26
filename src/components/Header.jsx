import 'boxicons/css/boxicons.min.css';

const Header = () => {
  // Simple function to toggle the mobile menu
  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-gray-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
        VENDOMART
    </h1>




      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-12">
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
          HOME
        </a>
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
          ABOUT
        </a>
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
          CONTACT
        </a>
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
          VENDORE
        </a>
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
          SUPPLIER
        </a>
      </nav>

      {/* Desktop Sign-in Button */}
      <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
        Get Started
      </button>

      {/* Mobile Hamburger Icon */}
      <button
        onClick={toggleMobileMenu}
        className="text-4xl md:hidden z-50"
        aria-label="Toggle Mobile Menu"
      >
        <i className="bx bx-menu"></i>
      </button>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className="hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md"
      >
        <nav className="flex flex-col gap-6 items-center">
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
            HOME
          </a>
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
            ABOUT
          </a>
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
            CONTACT
          </a>
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
            VENDORE
          </a>
          <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
            SUPPLIER
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

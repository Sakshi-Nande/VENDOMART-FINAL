import 'boxicons/css/boxicons.min.css';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-light m-0">
        VENDOMART
      </h1>
        {/* <nav className="flex space-x-4" href='#'>
            <a href="#home" className="text-lg">Home</a>
            <a href="#about" className="text-lg">About</a>
            <a href="#contact" className="text-lg">Contact</a></nav> */}
        <nav className="hidden md:flex items-center gap-12">
        <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
            HOME
        </a>

        <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
            ABOUT
        </a>

        <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
            CONTACT
        </a>

        <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
            VENDORE
        </a>

        <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
            SUPPLIER
        </a>
        </nav>


            <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
                SIGNIN
            </button>

            <button Classname='md:hidden text-3xl p-2 z-50'>
                <i class='bx bx-menu'></i>
            </button>


            <div>
                <nav>
                    <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
                        HOME
                    </a>

                    <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
                        ABOUT
                    </a>

                    <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
                        CONTACT
                    </a>

                    <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
                        VENDORE
                    </a>

                    <a className="text-base tracking-winder transition-colors hover:text-gray-300 z-50" href="#">
                        SUPPLIER
                    </a>
                </nav>
            </div>


    </header>
  );
};

export default Header;


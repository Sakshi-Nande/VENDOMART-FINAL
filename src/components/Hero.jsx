import 'boxicons/css/boxicons.min.css';
import Spline from '@splinetool/react-spline';
const Hero = () => {
  return (
    <main className="flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]">
      
      <div className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0">
        {/* Tag box-with gradient border */}

        <div className='relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full'>
            <div className='absolute inset-[3px] bg-black rounded-full flex items-center justify-center'>
                <i class='bx bx-diamond' ></i>
                INTRODUCTION
            </div>
        </div>
            {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold tracking-wider my-8">
            Solving India’s Street 
        <br />
            Food Supply Chain
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem]">
            Connect vendors with trusted suppliers.
            Source quality ingredients at the best prices with verified ratings, live tracking, and easy returns — all in one platform.
        </p>

        {/* Button */}
        <div className='flex gap-4 mt-12'>
            <a className="border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]" href="#">
                VENDOR <i className='bx bx-link-external'></i>
            </a>


            <a className="border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white" href="#">
                SUPPLIER <i className='bx bx-link-external'></i>
            </a>

        {/* 3d box */}

        
        </div>

      </div>
        {/* 3d box */}
        <Spline scene="https://prod.spline.design/S8OveZAbl9isQQ75/scene.splinecode" />
    
    </main>
  )
}

export default Hero;

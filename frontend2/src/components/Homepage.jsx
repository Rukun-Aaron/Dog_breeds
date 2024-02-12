import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Section 1: Blue background with a dog image */}
      <div className="w-full min-h-screen bg-white relative">
        <div
          className="text-black w-full h-full relative"
          style={{
            backgroundImage: `url('/bg2.png')`,
            backgroundPosition: 'center',
            minHeight: '100vh',
            backgroundSize: 'cover',
          }}
        >
          <div className="pt-4"><Navbar/></div>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between relative">
            <div className="md:w-3/5 mt-20 md:mt-40 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Identify <span className="text-[#694DDB]">Dog Breeds</span> From Photos With AI
              </h1>
              <p className="text-base md:text-lg mb-6">
                Your ultimate guide to choosing the perfect dog breed for you. Identify and weigh the pros and cons of various breeds with our detection and comparison tools.
              </p>
              <button
                onClick={() => navigate('/detection')}
                className="btn btn-ghost bg-[#694DDB] text-white px-8 md:px-12 py-3 mr-4 rounded-full"
              >
                Detect
              </button>
              <button
                onClick={() => navigate('/compare')}
                className="btn btn-ghost border-[#694DDB] border-2 text-[#694DDB] px-8 md:px-12 py-3 rounded-full"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <img alt="logo" src="/arrow.ico" className="h-8 w-8 opacity-30" />
        </div>
      </div>

      {/* Section 2: Details */}
      <div className="w-full min-h-screen bg-[#F7F8FF] flex flex-col items-center">
        <h1 className="text-4xl md:text-4xl font-bold mb-2 text-center mt-24">
          Can’t Decide On A New <span className="text-[#694DDB]">Furry Friend?</span>
        </h1>
        <h2 className="text-lg md:text-xl mb-8 text-center md:w-2/3">
          Our dog breed identification interface helps users decide on a new breed personalized to
          their preferences.
        </h2>

        {/* Left and Right Division */}
        <div className="md:w-2/3 w-full mb-16 flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Left side */}
          <div className="w-full flex justify-center md:w-1/2 mt-4 p-4 md:p-8 relative">
            <img
              alt="bernese-mountain-dog"
              src={process.env.PUBLIC_URL + '/bernese-mountain-dog.jpg'}
              className="w-full rounded-3xl md:max-w-lg"
            />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
              <img
                alt="second-dog-image"
                src={process.env.PUBLIC_URL + '/stats.png'}
                className="w-full rounded-3xl md:max-w-xs shadow-md"
              />
            </div>
          </div>


          {/* Right side */}
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl mb-8">How to identify a dog's breed?</h2>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center">
                <div className="rounded-full bg-[#FFA55B] text-white w-8 h-8 flex items-center justify-center mr-4">
                  1
                </div>
                <div className="text-lg">Navigate to 'Start Now'</div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-[#FFA55B] text-white w-8 h-8 flex items-center justify-center mr-4">
                  2
                </div>
                <div className="text-lg">Upload your dog images, our AI will identify the breed</div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-[#FFA55B] text-white w-8 h-8 flex items-center justify-center mr-4">
                  3
                </div>
                <div className="text-lg">Download results to your local device</div>
              </div>
            </div>
            <button
              onClick={() => navigate('/detection')}
              className="btn btn-ghost shadow-md bg-[#694DDB] text-white px-8 md:px-12 py-3 rounded-full mt-8"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

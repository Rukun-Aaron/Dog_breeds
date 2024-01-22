import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './NavBar';

function Homepage() {
    
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center relative z-0">
      {/* Section 1: Blue background with a dog image */}
      <div className="w-full min-h-screen bg-white relative"> 
        <div className="text-white w-full h-full pb-10 relative overflow-hidden"
            style={{
            backgroundImage: `url('/polygon2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '90vh',
            }}
        >
            
      <Navbar isHomepage />
        
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between relative">
                <div className="md:w-3/4 mt-28">
                    <h1 className="text-5xl font-bold mb-4">Identify dog breeds from photos with AI</h1>
                    <p className="text-lg mb-6">
                        Discover the best services and products for your furry friends.
                    </p>
                    <button onClick={() => navigate('/detection')} className="btn btn-ghost bg-orange-500 text-white px-12 py-3 rounded-full">
                        Start Now
                    </button>
                </div>
            </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/2 h-3/4 md:w-2/3 z-5">
          <img
            alt="dogs"
            src="/dog3.png"
            style={{ position: 'sticky', width: '50vw', top: 0, bottom: 0 }}
          />
        </div>
      </div>

      {/* Section 2: Details */}
      <div className="w-full min-h-screen bg-white flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2 text-center mt-24">Can’t decide on a new furry friend?</h1>
        <h2 className="text-xl mb-6 text-center">Our dog breed identification interface helps users decide on a new breed personalised to their preferences.</h2>

        {/* Left and Right Division */}
        <div className="w-full flex items-center justify-center md:w-2/3 gap-10">
            {/* Left side */}
            <div className="w-1/2 p-8 relative">
                <img
                alt="bernese-mountain-dog"
                src="/bernese-mountain-dog.jpg"
                style={{ borderRadius: '28px' }}
                />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2" >
        <img
            alt="second-dog-image"
            src="/stats.png"
            style={{ borderRadius: '28px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)' }}
        />
    </div>
            </div>

            {/* Right side */}
            <div className="w-1/2 p-8">
                <h2 className="text-3xl mb-8">How to identify a dog's breed?</h2>
                <div className="w-full h-full flex items-center">
                    <ul className="list-none p-0">
                        <li className="flex items-center mb-6">
                        <div className="rounded-full bg-blue-900 text-white w-8 h-8 flex items-center justify-center mr-6">
                            1
                        </div>
                        <div className="text-lg">
                            Navigate to 'Start Now' 
                        </div>
                        </li>
                        <li className="flex items-center mb-6">
                        <div className="rounded-full bg-blue-900 text-white w-8 h-8 flex items-center justify-center mr-6">
                            2
                        </div>
                        <div className="text-lg">
                            Upload your dog images, our AI will identify the breed 
                        </div>
                        </li>
                        <li className="flex items-center mb-6">
                        <div className="rounded-full bg-blue-900 text-white w-8 h-8 flex items-center justify-center mr-6">
                            3
                        </div>
                        <div className="text-lg">
                            Download results to your local device
                        </div>
                        </li>
                    </ul>
                </div>
                <button onClick={() => navigate('/detection')} className="btn btn-ghost bg-orange-500 text-white px-12 py-3 rounded-full mt-4">
                Start Now
                </button>
            </div>
        </div>
      </div>

        {/* Footer */}
        <div className="w-full min-h-40 bg-blue-300 clip-path-[polygon(0 0, 100% 0, 100% 80%, 0 100%)]"></div>
    </div>
  );
}

export default Homepage;

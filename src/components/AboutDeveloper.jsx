import React from 'react';
function AboutDeveloper() {
  return (
    <section className=" py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Developer</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Developer Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-blue-600">SM</span>
                  </div>
                  <p className="text-blue-800 font-medium">Developer Photo</p>
                  <p className="text-blue-600 text-sm">Coming Soon</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600 rounded-full opacity-10"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-400 rounded-full opacity-20"></div>
            </div>
          </div>
          
          {/* Developer Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Siddharth Mishra</h3>
              <p className="text-xl text-blue-600 font-medium mb-6">Full Stack Developer</p>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Passionate about creating innovative educational solutions that bridge the gap between 
              technology and learning. With extensive experience in modern web development frameworks, 
              Siddharth specializes in building user-centric applications that prioritize both 
              functionality and aesthetic appeal.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Drawing inspiration from the evolving landscape of digital education, Siddharth combines 
              technical expertise with pedagogical understanding to develop platforms that enhance 
              the learning experience. QuizHub represents this vision of making educational tools 
              more accessible, engaging, and effective for learners across diverse backgrounds.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2">Expertise</h4>
                <p className="text-gray-600 text-sm">
                  React, JavaScript, CSS Frameworks, UI/UX Design, Educational Technology
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-800 mb-2">Focus Areas</h4>
                <p className="text-gray-600 text-sm">
                  Interactive Learning, Responsive Design, Performance Optimization
                </p>
              </div>
            </div>


            {/* Will Be populated later */}
            {/* <div className="flex space-x-4 mt-6">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                View Portfolio
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                Download Resume
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutDeveloper;
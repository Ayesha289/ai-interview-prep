import React from 'react';

const BoxContainer = () => {
  return (
    <div className="flex space-x-4 p-4 w-full items-center justify-between">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="w-72 h-72 border-white border-2 p-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-900 transition-shadow duration-300"
        >
          Box {index + 1}
        </div>
      ))}
    </div>
  );
};

export default BoxContainer;

import React from 'react';

const Index = ({ title,children }) => {
  return (
    <header className="bg-white text-primaryDarkBlue p-4 ">
      <div className="max-w-7xl mx-auto flex items-center">
        <h1 className="text-lg font-semibold justify-between">{title ? title : ""}</h1>
        <div>
          {children}
        </div>
      </div>
    </header>
  );
};

export default Index;

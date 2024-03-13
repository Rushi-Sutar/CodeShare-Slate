import React, { useState } from 'react'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
  return (
    <nav className="bg-gray-800 p-4 relative z-50"> 
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-white text-lg font-semibold">CodeShare Slate</span>
      </div>
      </div>
    
  </nav>
  )
}

export default Navbar

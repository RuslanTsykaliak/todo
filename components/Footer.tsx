import React from 'react';

function Footer() {

  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p className="text-gray-600">© {new Date().getFullYear()} Your Todo App. All rights reserved.</p>
    
    </footer>
  );
}

export default Footer;

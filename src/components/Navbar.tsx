import React from 'react';
import '@/styles/components/navbar.css';
import { Button } from '@radix-ui/themes';

const Navbar = () => {
  return (
    <div className='parent_container w-100 h-26 flex flex-row justify-between p-8 align-center '>
      <p>Shopee</p>
      <Button variant="solid">Edit profile</Button>
    </div>
  );
};

export default Navbar;
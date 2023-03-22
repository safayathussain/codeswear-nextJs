import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { ImCart } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';

import logo from '../public/logo.png'

const Navbar = ({logout, user, cart, addToCart, removeFromCart, subTotal, clearCart }) => {
    const ref = useRef();
    const [dropdown, setDropdown] = useState(false)
    const handleDropdown = (e) => {
        if (e == true) {
            setDropdown(e)
        } else {
            setTimeout(() => {
                setDropdown(e)
            }, 2000);

        }
    }
    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.add('translate-x-0')
            ref.current.classList.remove('translate-x-full')
        }
        else if (ref.current.classList.contains('translate-x-0')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    return (
        <div className='overflow-x-hidden sticky top-0 h-full w-full z-30'>
            <header className="text-gray-400 bg-gray-900 shadow-md shadow-blue mb-[0.5px] body-font ">
                <div className="container mx-auto flex flex-wrap p-0 flex-col md:flex-row items-center">
                    <a href={'/'} className="flex title-font font-medium items-center  text-white mb-4 md:mb-0">
                        <Image src={logo} width={150} height={50} alt='' />
                    </a>
                    <nav className="md:ml-auto md:mr-auto mb-5 md:mb-0 flex flex-wrap items-center text-base justify-center">
                        <Link href={'/tshirts'} className="mr-5 hover:text-white">Tshirts</Link>
                        <Link href={'/hoodies'} className="mr-5 hover:text-white">Hoodies</Link>
                        <Link href={'/stickers'} className="mr-5 hover:text-white">Stickers</Link>
                        <Link href={'/mugs'} className="mr-5 hover:text-white">Mugs</Link>

                    </nav>
                    <div className='flex flex-col justify-start px-7'>
                        <div className="absolute lg:relative right-3 items-center justify-start w-full border-0 py-1 px-0 focus:outline-non rounded hover:text-white mt-4 md:mt-0">
                            {user.value && <MdAccountCircle onMouseEnter={() => handleDropdown(true)} onMouseLeave={() => handleDropdown(false)} size={25} className='cursor-pointer' />}
                            {!user.value && <Link href={'/login'}>Login</Link>}
                            {dropdown && <div className='ml-[-70px] rounded-md fixed top-12 z-[9999] flex shadow-lg' onMouseEnter={() => handleDropdown(true)} onMouseLeave={() => handleDropdown(false)}>
                                <ul className='bg-white py-5 px-7  rounded-md'>
                                    <li className='py-1 cursor-pointer'><Link className='text-md text-black font-normal hover:text-blue' href={'/account'}>Account</Link></li>
                                    <li className='py-1 cursor-pointer'><Link className='text-md text-black font-normal hover:text-blue' href={'/order'}>Orders</Link></li>
                                    <li className='py-1 cursor-pointer'><a onClick={logout} className='text-md text-black font-normal hover:text-blue'>Logout</a></li>
                                </ul>
                            </div>}
                        </div>

                    </div>
                    <button onClick={toggleCart} className="absolute lg:relative right-3 items-center border-0 py-1 px-3 focus:outline-non rounded hover:text-white mt-4 md:mt-0">
                        <ImCart size={25} />
                    </button>
                </div>
            </header>
            <div ref={ref} className={`p-12 overflow-y-scroll shadow-2xl fixed top-0 rounded-l-md h-screen z-50 duration-300 right-0 bg-white transform transition-translate ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <span onClick={toggleCart} className='absolute top-4 right-4 cursor-pointer text-2xl'>
                    <IoClose />
                </span>
                <p className='text-center text-2xl my-5'>Cart</p>
                <ol className='list-decimal'>
                    {Object.keys(cart) == 0 && <div className='text-red-600'>Your cart is empty</div>}
                    {
                        Object.keys(cart).map(k => {
                            return <li key={k}>
                                <div className='flex gap-5 py-2.5'>
                                    <p className='max-w-[200px]'>{cart[k].name} <span className='text-xs'>({cart[k].size}/{cart[k].variant})</span></p>
                                    <div className='flex gap-3 items-center'>
                                        <AiOutlineMinusCircle onClick={() => removeFromCart(k, 1, 58, 'tshirt', 'Xl', 'blue')} className='cursor-pointer' />
                                        <p>{cart[k].qty}</p>
                                        <AiOutlinePlusCircle onClick={() => addToCart(k, 1, 58, 'tshirt', 'Xl', 'blue')} className='cursor-pointer' />
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ol>
                <p className='py-4'>subTotal: ${subTotal}</p>
                <div className='flex gap-2 my-3'>
                    <Link href={'/checkout'}><button className="flex mx-auto text-white bg-blue border-0 py-2 px-8 focus:outline-none rounded text-sm">Checkout</button></Link>
                    <button onClick={clearCart} className="flex mx-auto text-white  bg-red-600 border-0 py-2 px-8 focus:outline-none rounded text-sm">Clear</button>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
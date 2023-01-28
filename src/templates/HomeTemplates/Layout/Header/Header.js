import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
	const [collapse, setCollapse] = useState(false);

	return (
		<header className='fixed z-10 w-full py-4 px-10 bg-black bg-opacity-40 text-gray-300'>
			<div className='md:container md:flex justify-between mx-auto'>
				<a rel='noopener noreferrer' href='/#' className='flex items-center py-2 font-bold text-2xl tracking-widest text-white'>
					LOGO NAV
				</a>
				<ul className={`absolute md:static left-0 top-20 w-full md:w-auto bg-black bg-opacity-40 md:bg-opacity-0 items-stretch space-y-5 md:space-y-0 md:space-x-3 md:flex md:pt-0 md:pb-0 md:pl-0 pl-10 transition-[height,padding] duration-500 ease-in-out overflow-hidden md:h-auto ${collapse ? 'h-[180px] pt-5 pb-8' : 'h-0 py-0'}`}>
					<li className='flex'>
						<NavLink to='/home' className='md:flex items-center md:px-4' activeClassName='text-white md:border-b-2 border-white'>
							Home
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink to='/contact' className='md:flex items-center md:px-4' activeClassName='text-white md:border-b-2 border-white'>
							Contact
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink to='/news' className='md:flex items-center md:px-4' activeClassName='text-white md:border-b-2 border-white'>
							News
						</NavLink>
					</li>
				</ul>
				<div className='flex-shrink-0 hidden md:flex flex-row items-center'>
					<button className='self-start md:self-center px-4 py-2 rounded text-white'>Sign in</button>
					<button className='self-start md:self-center px-4 py-2 font-semibold rounded bg-sky-600 text-gray-50'>Sign up</button>
				</div>
				<button onClick={() => setCollapse(!collapse)} className='p-4 md:hidden absolute right-10 top-4 cursor-pointer'>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6 text-white'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
					</svg>
				</button>
			</div>
		</header>
	);
}

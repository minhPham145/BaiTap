import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../util/history';
export default function Header() {
	const [collapse, setCollapse] = useState(false);

	return (
		<>
			<div className='flex'>
				<header className='fixed z-[20] w-full px-10 bg-white bg-opacity-90 shadow-lg'>
					<div className='md:container md:flex justify-between mx-auto'>
						<NavLink to='/' className='flex items-center py-2 font-bold text-2xl tracking-widest'>
							<span className='text-[#1677FF]'>LOGO </span>MOVIE
						</NavLink>
						<ul className={`absolute md:static left-0 top-12 w-full md:w-auto bg-white bg-opacity-90 md:bg-opacity-0 items-stretch space-y-5 md:space-y-0 md:space-x-3 md:flex md:pt-0 md:pb-0 md:pl-0 pl-10 transition-[height,padding,shadow] duration-500 ease-in-out overflow-hidden md:h-auto  ${collapse ? 'h-[180px] pt-5 pb-8 shadow-lg' : 'h-0 py-0'}`}>
							<li className='flex'>
								<NavLink to='/home' className='md:flex items-center md:px-4 font-semibold' activeClassName='text-[#1677FF]'>
									Home
								</NavLink>
							</li>
							<li className='flex'>
								<NavLink to='/contact' className='md:flex items-center md:px-4 font-semibold' activeClassName='text-[#1677FF]'>
									Contact
								</NavLink>
							</li>
							<li className='flex'>
								<NavLink to='/news' className='md:flex items-center md:px-4 font-semibold' activeClassName='text-[#1677FF]'>
									News
								</NavLink>
							</li>
						</ul>
						<div className='flex-shrink-0 hidden md:flex flex-row items-center'>
							<button
								onClick={() => {
									history.push('/login');
								}}
								className='self-start md:self-center px-4 font-semibold mr-2 border-r-[1px]'>
								Sign in
							</button>
							<button className='self-start md:self-center px-4 font-semibold'>Sign up</button>
						</div>
						<button onClick={() => setCollapse(!collapse)} className='md:hidden absolute right-10 top-4 cursor-pointer'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-6 h-6 text-black'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
							</svg>
						</button>
					</div>
				</header>
			</div>
			<div className='mt-12'></div>
		</>
	);
}

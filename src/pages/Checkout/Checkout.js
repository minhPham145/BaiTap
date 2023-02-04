import React from 'react';
import { useSelector } from 'react-redux';
import styleCheckout from './Checkout.module.css';


export default function Checkout() {
	const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
	console.log(userLogin);

	return (
		<div>
			<div className='flex'>
				<section className='flex-[75%]'></section>
				<section className='flex-[25%]'>
					<aside className='w-full h-screen flex px-[8%] overflow-auto relative shadow-2xl flex-col justify-start select-none'>
						<div className='py-3 border-b-[1px] border-dashed'>
							<p className='text-green-600 text-[41px] text-center font-medium leading-[60px]'>0 đ</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed'>
							<p className='font-medium capitalize'>nhà bà nữ</p>
							<p>BHD Star Cineplex - 3/2</p>
							<p>Thứ tư 25/05/2022 - 02:05 - Rạp 1</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed flex justify-between text-lg'>
							<span className='text-red-500'>Ghế</span>
							<p className='flex-[0_0_82px] text-green-600 font-medium text-right'>0 đ</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed relative'>
							<label className='text-gray-400 text-sm absolute top-[9%] left-0 block'>Email</label>
							<p className='pt-3 mt-[5px]'>{userLogin.email}</p>
						</div>
						<div className='py-3 border-b-[1px] border-dashed relative'>
							<label className='text-gray-400 text-sm absolute top-[9%] left-0 block'>Phone</label>
							<p className='pt-3 mt-[5px]'>{userLogin.soDT}</p>
						</div>
						<div className='absolute bottom-0 left-0 w-full'>
							<button className='cursor-pointer h-[60px] bg-green-600 w-full text-2xl text-white'>Đặt Vé</button>
						</div>
					</aside>
				</section>
			</div>
		</div>
	);
}

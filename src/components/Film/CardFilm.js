import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
export default function CardFilm(props) {
	const { film } = props;

	return (
		<div className='relative w-full h-full overflow-hidden group'>
			<div className='relative pt-[150%] bg-center bg-cover bg-no-repeat rounded-lg overflow-hidden' style={{ backgroundImage: `url(${film.hinhAnh})` }}>
				<div className='absolute z-[1] left-1/2 translate-x-[-50%] top-[55px] lg:top-[100px] xl:top-[55px] opacity-0 duration-500 group-hover:opacity-100'>
					<PlayCircleOutlined className='text-white text-7xl leading-[0] hidden md:inline-block' />
				</div>
				<div className='absolute w-full h-full top-full p-5 duration-500 bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_transparent)] flex group-hover:top-0'>
					<div className='mt-auto'>
						<h1 className='text-gray-100 text-lg mb-2'>{film.tenPhim}</h1>
						<p className='text-gray-300 text-xs mb-4 line-clamp-3'>{film.moTa}</p>
						<NavLink to={`detail/${film.maPhim}`}>
							<button className='text-white bg-red-500 text-lg px-4 py-2 rounded hover:bg-red-600 uppercase'>ĐẶT VÉ</button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

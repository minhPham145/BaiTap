import { Tabs } from 'antd';
import React from 'react';
import bgPoster from '../../assets/avenger-poster.jpg';
import './progress-circle.css';

const renderHeThongRap = () => {
	return [1, 2, 3, 4, 5].map((_, i) => {
		return {
			label: 'sadasdhsakjdhjk',
			key: i,
			children: <div>ádsaddssdsadaasd</div>,
		};
	});
};

export default function Detail() {
	return (
		<div>
			<div className=''>
				<div className='w-full h-[40vw] relative'>
					<div className='absolute top-0 bottom-0 left-0 right-0 blur-[15px] bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgPoster})` }}></div>
					<div className='flex items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full max-w-[870px] h-[320px]'>
						<div className='w-1/4 h-full bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bgPoster})` }}></div>
						<div className='w-1/2 px-4'>
							<p className='text-gray-100 text-lg'>2023.10.20</p>
							<p className='text-gray-100 text-2xl mb-4'>Mèo Đi Hia</p>
							<button className='text-white bg-red-500 text-lg px-4 py-2 rounded hover:bg-red-600'>Mua vé</button>
						</div>
						<div>
							<div class='c100 p25'>
								<span>25%</span>
								<div class='slice'>
									<div class='bar'></div>
									<div class='fill'></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='pb-24'>
					<Tabs tabPosition='left' items={renderHeThongRap()} />
				</div>
			</div>
		</div>
	);
}

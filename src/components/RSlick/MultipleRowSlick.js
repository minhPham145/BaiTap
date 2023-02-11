import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import CardFilm from '../Film/CardFilm';
import { layDanhSachPhimDangChieu, layDanhSachPhimSapChieu } from '../../redux/actions/QuanLyPhimAction';

function SampleNextArrow(props) {
	const { onClick } = props;
	return (
		<button type='button' onClick={onClick} className='flex before:content-none absolute z-[1] top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white shadow-md hover:text-red-500 -right-6'>
			<RightOutlined className='m-auto' />
		</button>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<button type='button' onClick={onClick} className='flex before:content-none absolute z-[1] top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white shadow-md hover:text-red-500 -left-6'>
			<LeftOutlined className='m-auto' />
		</button>
	);
}

export default function MultipleRowSlick(props) {
	const { arrFilm } = props;
	const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
	const dispatch = useDispatch();

	const settings = {
		infinite: true,
		centerPadding: '0',
		slidesToShow: 4,
		slidesToScroll: 4,
		speed: 500,
		rows: 2,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					rows: 2,
					infinite: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					rows: 1,
				},
			},
		],
	};

	const renderFilm = () => {
		return arrFilm.map((film, index) => {
			return (
				<div key={index} className='p-1'>
					<CardFilm film={film} />
				</div>
			);
		});
	};

	return (
		<div className='pt-12 pb-24'>
			<div className='flex mb-12'>
				<div className='mx-auto'>
					<button className={`min-w-[160px] py-[6px] px-3 text-2xl hover:scale-110 duration-500 ${dangChieu ? 'text-red-500 scale-110' : ''}`} onClick={() => dispatch(layDanhSachPhimDangChieu())}>
						Đang chiếu
					</button>
					<button className={`min-w-[160px] py-[6px] px-3 text-2xl hover:scale-110 duration-500 ${sapChieu ? 'text-red-500 scale-110' : ''}`} onClick={() => dispatch(layDanhSachPhimSapChieu())}>
						Sắp chiếu
					</button>
				</div>
			</div>
			<Slider {...settings}>{renderFilm()}</Slider>
		</div>
	);
}

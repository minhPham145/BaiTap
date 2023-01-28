import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';

const contentStyle = {
	height: '100vh',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	backgroundPosition: 'center',
	backgroundSize: '100% 100%',
};

export default function HomeCarousel(props) {
	const { arrImg } = useSelector(state => state.CarouselReducer);

	const dispatch = useDispatch();

	const renderImg = () => {
		return arrImg.map((item, index) => {
			return (
				<div key={index}>
					<div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
						<img className='w-full opacity-0' src={item.hinhAnh} alt={item.hinhAnh} />
					</div>
				</div>
			);
		});
	};

	useEffect(() => {
		dispatch(getCarouselAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Carousel effect='fade'>{renderImg()}</Carousel>;
}

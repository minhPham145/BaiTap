import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';

const contentStyle = {
	paddingTop: '56%',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	backgroundPosition: 'center',
	backgroundSize: '100% 100%',
};

export default function HomeCarousel(props) {
	const { arrImg } = useSelector(state => state.CarouselReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCarouselAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderImg = () => {
		return arrImg.map((item, index) => {
			return (
				<div key={index}>
					<div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})`, position: 'relative' }}>
						<div className='absolute top-0 bottom-0 left-0 right-0'></div>
					</div>
				</div>
			);
		});
	};

	return <Carousel effect='fade'>{renderImg()}</Carousel>;
}

import { Route } from 'react-router-dom';
import movieBg from '../../assets/movieBg.png';
import Footer from '../HomeTemplates/Layout/Footer/Footer';
export const UserTemplate = props => {
	const { Component, ...restProps } = props;

	return (
		<Route
			{...restProps}
			render={propsRoute => {
				return (
					<div className='bg-contain bg-center h-screen overflow-y-auto scrollbar relative' style={{ backgroundImage: `url(${movieBg})` }}>
						<div className='absolute top-0 left-0 p-5 text-5xl font-bold text-white'>
							LOGO<span className='text-red-500'>MOVIE</span>
						</div>
						<div className='min-h-screen bg-black/60 flex justify-center items-center'>
							<div className='w-2/3 lg:w-1/3 my-24 bg-black/75 rounded'>
								<Component {...propsRoute} />
							</div>
						</div>
						<Footer />
					</div>
				);
			}}
		/>
	);
};

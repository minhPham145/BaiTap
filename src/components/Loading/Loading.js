import React from 'react';
import { useSelector } from 'react-redux';

export default function Loading() {
	const { isLoading } = useSelector(state => state.LoadingReducer);

	return isLoading ? (
		<div>
			<div className='fixed z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
				<div className='animate-spin inline-block w-14 h-14 rounded-full border-[10px] border-green-600 border-t-transparent' role='status'></div>
			</div>
			<div className='fixed z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
				<span className='text-white font-medium tracking-wider translate-y-14'>Loading...</span>
			</div>
		</div>
	) : null;
}

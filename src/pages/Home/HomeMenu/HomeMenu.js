import { Tabs } from 'antd';
import React from 'react';

export default function HomeMenu() {
	return (
		<Tabs
			tabPosition='left'
			items={new Array(3).fill(null).map((_, i) => {
				const id = String(i + 1);
				return {
					label: <img className='rounded-full w-[50px]' src='https://picsum.photos/200' alt='https://picsum.photos/200' />,
					key: id,
					children: `Content of Tab ${id}`,
				};
			})}
		/>
	);
}

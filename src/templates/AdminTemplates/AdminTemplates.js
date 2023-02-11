import React, { useState } from 'react';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { history } from '../../util/history';
import _ from 'lodash';

const { Header, Content, Sider, Footer } = Layout;

function getItem(label, key, icon, children) {
	return { label, key, icon, children };
}

const items = [
	//get item

	getItem('Films', '1', <VideoCameraOutlined />, [
		//get subItem
		getItem(<NavLink to='/admin/films'>Films</NavLink>, '10'),
		getItem(<NavLink to='/admin/films/addnew'>Add new</NavLink>, '11'),
	]),
	getItem('Users', '2', <UserOutlined />, [
		//get subItem
		getItem(<NavLink to='/admin/users'>Users</NavLink>, '22'),
		getItem(<NavLink to='/admin/users/adduser'>Add users</NavLink>, '23'),
	]),
];

export const AdminTemplates = props => {
	const { Component, ...restProps } = props;

	const [collapsed, setCollapsed] = useState(false);

	const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	if (!localStorage.getItem(USER_LOGIN)) {
		alert('Bạn không có quyền truy cập trang này!');
		return <Redirect to='/home' />;
	}

	if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
		alert('Bạn không có quyền truy cập trang này!');
		return <Redirect to='/' />;
	}

	const operations = (
		<>
			{!_.isEmpty(userLogin) ? (
				<div className='ml-auto'>
					<button
						className='px-2'
						onClick={() => {
							history.push('/profile');
						}}>
						<Avatar size='large' className='capitalize bg-green-100 text-green-600 font-semibold mr-2'>
							{userLogin.taiKhoan.substr(0, 1)}
						</Avatar>
					</button>{' '}
					<button
						className='text-red-500 font-medium bg-red-100 px-4'
						onClick={() => {
							localStorage.removeItem(USER_LOGIN);
							localStorage.removeItem(TOKEN);
							history.push('/home');
							window.location.reload();
						}}>
						Đăng xuất
					</button>
				</div>
			) : null}
		</>
	);

	return (
		<Route
			{...restProps}
			render={propsRoute => {
				return (
					<Layout style={{ height: '100vh' }}>
						<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
							<div className='h-[32px] m-4 flex justify-center items-center'>
								<p className='text-lg text-white font-medium'>MOVIE</p>
							</div>
							<Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
						</Sider>
						<Layout className='site-layout'>
							<Header className='flex' style={{ padding: 0, background: colorBgContainer }}>
								{operations}
							</Header>
							<Content style={{ margin: '0 16px' }}>
								<Breadcrumb style={{ margin: '10px 0' }}></Breadcrumb>
								<div className='h-[550px] overflow-y-auto scrollbar' style={{ padding: 24, background: colorBgContainer }}>
									<Component {...propsRoute} />
								</div>
							</Content>
						</Layout>
					</Layout>
				);
			}}
		/>
	);
};

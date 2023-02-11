import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../util/history';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

const { Search } = Input;

export default function Users() {
	const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDanhSachNguoiDungAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	danhSachNguoiDung.forEach((user, i) => {
		user.id = i;
	});
	console.log('danhSachNguoiDung: ', danhSachNguoiDung);
	const columns = [
		{
			title: 'STT',
			dataIndex: 'id',
			sorter: (a, b) => a.id - b.id,
			sortDirections: ['descend', 'ascend'],
			width: '5%',
		},
		{
			title: 'Tài khoản',
			dataIndex: 'taiKhoan',
			sorter: (a, b) => {
				const taiKhoanA = a.taiKhoan.toLowerCase().trim();
				const taiKhoanB = b.taiKhoan.toLowerCase().trim();
				if (taiKhoanA > taiKhoanB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ['descend', 'ascend'],
			width: '15%',
		},
		{
			title: 'Mật khẩu',
			dataIndex: 'matKhau',
			sorter: (a, b) => {
				const matKhauA = a.matKhau;
				const matKhauB = b.matKhau;
				if (matKhauA > matKhauB) {
					return 1;
				}
				return -1;
			},

			width: '15%',
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			sorter: (a, b) => {
				const hoTenA = a.hoTen.toLowerCase().trim();
				const hoTenB = b.hoTen.toLowerCase().trim();
				if (hoTenA > hoTenB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ['descend', 'ascend'],
			width: '15%',
		},

		{
			title: 'Email',
			dataIndex: 'email',
			sorter: (a, b) => {
				const emailA = a.email.toLowerCase().trim();
				const emailB = b.email.toLowerCase().trim();
				if (emailA > emailB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ['descend', 'ascend'],
			width: '15%',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'soDt',
			sorter: (a, b) => a.soDt - b.soDt,
			sortDirections: ['descend', 'ascend'],
			width: '15%',
		},
		{
			title: 'Hành động',
			render: user => {
				return (
					<>
						<button
							className='min-w-[60px] px-2 border-[1px] border-indigo-500 text-indigo-500 rounded-sm hover:bg-indigo-500 hover:text-white mr-2'
							onClick={() => {
								history.push(`/admin/users/edituser/${user.taiKhoan}`);
							}}>
							Edit
						</button>

						<button
							className='min-w-[60px] px-2 border-[1px] border-red-500 text-red-500 rounded-sm hover:bg-red-500 hover:text-white'
							onClick={() => {
								if (window.confirm('Bạn có chắc muốn xóa tài khoản ' + user.taiKhoan)) {
									dispatch(xoaNguoiDungAction(user.taiKhoan));
								}
							}}>
							Delete
						</button>
					</>
				);
			},
			width: '20%',
		},
	];

	const onSearch = value => dispatch(layDanhSachNguoiDungAction(value));
	return (
		<div className=''>
			<h1 className='text-2xl mb-4'>Quản Lý Người Dùng</h1>
			<Button className='mb-4' onClick={() => history.push('/admin/users/adduser')}>
				Thêm người dùng
			</Button>
			<Search className='mb-4 btn-primary' placeholder='search user...' enterButton={<SearchOutlined className='align-middle' />} size='large' suffix onSearch={onSearch} />
			<Table rowKey='taiKhoan' columns={columns} dataSource={danhSachNguoiDung} pagination={{ defaultCurrent: 1, pageSize: 5, showSizeChanger: false }} />
		</div>
	);
}

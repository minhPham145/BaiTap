import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../util/history';

const { Search } = Input;

export default function Films() {
	const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);

	const dispatch = useDispatch();

	console.log(arrFilmDefault);

	useEffect(() => {
		dispatch(layDanhSachPhimAction());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			title: 'Mã phim',
			dataIndex: 'maPhim',
			sorter: (a, b) => a.maPhim - b.maPhim,
			sortDirections: ['descend', 'ascend'],
			width: '10%',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'hinhAnh',
			render: (text, film, index) => (
				<img
					className='w-[50px] h-[50px]'
					onError={e => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = `https://picsum.photos/id/${index}/50`;
					}}
					src={text}
					alt={text}
				/>
			),
			width: '10%',
		},
		{
			title: 'Tên phim',
			dataIndex: 'tenPhim',
			sorter: (a, b) => {
				const tenPhimA = a.tenPhim.toLowerCase().trim();
				const tenPhimB = b.tenPhim.toLowerCase().trim();
				if (tenPhimA > tenPhimB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ['descend', 'ascend'],
			width: '25%',
		},
		{
			title: 'Mô tả',
			dataIndex: 'moTa',
			render: (text, film) => {
				return film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa;
			},
			sorter: (a, b) => {
				const moTaA = a.moTa.toLowerCase().trim();
				const moTaB = b.moTa.toLowerCase().trim();
				if (moTaA > moTaB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ['descend', 'ascend'],
			width: '30%',
		},
		{
			title: 'Hành động',
			render: film => {
				return (
					<>
						<button
							className='min-w-[65px] px-2 border-[1px] border-indigo-500 text-indigo-500 rounded-sm hover:bg-indigo-500 hover:text-white mr-2'
							onClick={() => {
								history.push(`/admin/films/edit/${film.maPhim}`);
							}}>
							Edit
						</button>

						<button
							className='min-w-[65px] px-2 border-[1px] border-red-500 text-red-500 rounded-sm hover:bg-red-500 hover:text-white mr-2'
							onClick={() => {
								if (window.confirm('Bạn có chắc muốn xóa phim ' + film.tenPhim)) {
									dispatch(xoaPhimAction(film.maPhim));
								}
							}}>
							Delete
						</button>

						<button
							className='min-w-[65px] px-2 border-[1px] border-indigo-500 text-indigo-500 rounded-sm hover:bg-indigo-500 hover:text-white'
							onClick={() => {
								history.push(`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`);
								localStorage.setItem('filmParams', JSON.stringify(film));
							}}>
							Lên lịch
						</button>
					</>
				);
			},
			width: '25%',
		},
	];

	const onSearch = value => dispatch(layDanhSachPhimAction(value));

	return (
		<div className=''>
			<h1 className='text-2xl mb-4'>Quản Lý Phim</h1>
			<Button className='mb-4' onClick={() => history.push('/admin/films/addnew')}>
				Thêm phim
			</Button>
			<Search className='mb-4 btn-primary' placeholder='input search text' enterButton={<SearchOutlined className='align-middle' />} size='large' suffix onSearch={onSearch} />
			<Table rowKey='maPhim' columns={columns} dataSource={arrFilmDefault} pagination={{ defaultCurrent: 1, pageSize: 5 }} />
		</div>
	);
}

import React, {memo, useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Row, Col, Input, Card, Divider, Spin, Modal} from "antd";
import {searchMovies, loadMoreMovies} from "@reduxActions";

const {Search} = Input;

const containerStyle = {
	padding: '12px',
	width: '100%'
};

const SearchMovies = memo(() =>
{
	const history = useHistory();
	const {location} = history;
	const {loading} = useSelector(({movies}) => movies);
	let query = new URLSearchParams(location.search);

	const searchConfig = {
		placeholder: loading ? 'Searching...' : 'Search movie...',
		disabled: loading,
		loading: loading,
		className: "gx-w-100 gx-mb-0",
		allowClear: true,
		enterButton: true,
		size: 'large',
		defaultValue: query.get('search'),
		onSearch: (value) => history.push(`/movies${value ? `?search=${value}` : ''}`)
	};

	return (
		<div className="gx-w-100 gx-mb-3 gx-mx-2">
			<Search {...searchConfig}/>
		</div>
	)
});

const MovieItem = memo(({record}) =>
{
	const [showPoster, setShowPoster] = useState(false);
	const {Poster: poster, Title: title, Year: year, imdbID} = record;

	return (
		<React.Fragment>
			<Card className="gx-mb-0 gx-h-100">
				<img alt="" src={poster} onClick={() => setShowPoster(true)}
				className="gx-w-100 gx-rounded-sm gx-pointer gx-mb-2" style={{height: '160px', objectFit: 'cover'}}/>
				<Link to={`/movies/${imdbID}`}>
					<h3 className="gx-link">{title}</h3>
				</Link>
				<h6>Year: {year}</h6>
			</Card>
			<Modal visible={showPoster} onCancel={() => setShowPoster(false)} footer={null} closable>
				<img alt="" src={poster} className="gx-w-100 gx-rounded-sm"/>
			</Modal>
		</React.Fragment>
	)
});

export default memo(() =>
{
	const dispatch = useDispatch();
	const {location} = useHistory();
	const {search} = location;
	const {loading, data, total} = useSelector(({movies}) => movies);
	const refList = useRef(null);
	const {current} = refList ? refList : {};

	useEffect(() => {
		let query = new URLSearchParams(search);
		dispatch(searchMovies(query.get('search')));
	}, [dispatch, search]);

	useEffect(() =>
	{
		if (current)
		{
			current.addEventListener('scroll', () =>
			{
		        const {scrollTop, scrollHeight, clientHeight} = current;
		        if ((scrollTop + clientHeight) >= (scrollHeight - 10)) dispatch(loadMoreMovies());
		    }, {passive: true});
		}
	}, [dispatch, current]);

	return (
		<div style={containerStyle}>
			<Row>
				<Col span={24}>
					<SearchMovies/>
					<Divider>{total ? `Showing 1-${data ? data.length : 0} of ${total} search results` : null}</Divider>
				</Col>
				<Col span={24}>
					<Spin spinning={loading} size="large">
						<div style={{height: '80vh', overflow: 'hidden scroll'}} ref={refList}>
							{(data && data.length) ? (
								<Row gutter={[8,8]}>
									{data.map((row, index) => (
										<Col xxl={6} xl={6} lg={8} md={12} sm={24} xs={24} key={index}>
											<MovieItem record={row}/>
										</Col>
									))}
								</Row>
							) : (
								<div style={{width: '100%', padding: '30px 0px', textAlign: 'center'}}>
									Movie not found. Try another search keyword
								</div>
							)}
						</div>
					</Spin>
				</Col>

			</Row>
		</div>
	)
});
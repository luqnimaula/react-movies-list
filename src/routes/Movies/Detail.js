import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getMovieDetail, resetDetail} from "@reduxActions";
import {Row, Col, Spin} from "antd";

const containerStyle = {
	padding: '12px',
	width: '100%'
};

export default memo(() =>
{
	const dispatch = useDispatch();
	const {slug} = useParams();

	useEffect(() => {
		if (slug) dispatch(getMovieDetail(slug));
		return () => dispatch(resetDetail());
	}, [dispatch, slug]);

	const {detail_loading, detail_data} = useSelector(({movies}) => movies);

	const {
		Poster: poster,
		Title: title,
		Year: year,
		Country: country,
		Actors: actors,
		Awards: awards,
		Director: director,
		Genre: genre,
		Language: language,
		Plot: plot,
		Released: released,
		Runtime: runtime,
		Writer: writer,
		imdbRating,
		Ratings: ratings
	} = detail_data ? detail_data : {};

	return (
		<div style={containerStyle}>
			<Spin spinning={detail_loading} size="large">
				<Row gutter={[16,16]}>
					<Col xxl={6} xl={6} lg={8} md={12} sm={24} xs={24}>
						<div className="gx-w-100 gx-text-center">
							<img alt="" src={poster} className="gx-w-100 gx-rounded-sm gx-mb-2" draggable="false"/>
						</div>
					</Col>
					<Col xxl={18} xl={18} lg={16} md={12} sm={24} xs={24}>
						<h1>{title}</h1>
						{genre && <h4>Genre: {genre}</h4>}
						<div className="gx-w-100">
							{imdbRating && <span className="gx-fs-sm gx-mr-4 gx-font-weight-semi-bold">Rating : {imdbRating}</span>}
							{runtime && <span className="gx-fs-sm gx-mr-4">Duration : {runtime}</span>}
							{year && <span className="gx-fs-sm gx-mr-4">Year : {year}</span>}
							{country && <span className="gx-fs-sm gx-mr-4">Country : {country}</span>}
							{released && <span className="gx-fs-sm gx-mr-4">Released at : {released}</span>}
						</div>
						<hr/>
						{plot && <p className="gx-mt-4 gx-mb-3">{plot}</p>}
						{language && <p>Language: {language}</p>}
						{director && <p>Director: {director}</p>}
						{actors && <p>Actors: {actors}</p>}
						{writer && <p>Writer: {writer}</p>}
						{awards && <p>Awards: {awards}</p>}
						{(ratings && ratings.length) ? (
							<React.Fragment>
								<h4>Another rating sources:</h4>
								<ul>
									{ratings.map(({Source: source, Value: value}, index) => (
										<li key={index}>
											<span className="gx-font-weight-semi-bold gx-mr-2">{value}</span>{source}
										</li>
									))}
								</ul>
							</React.Fragment>
						) : null}
					</Col>
				</Row>
			</Spin>
		</div>
	)
});
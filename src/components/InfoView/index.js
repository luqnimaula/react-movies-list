import React, {useEffect} from 'react';
import CircularProgress from "components/CircularProgress/index";
import {useDispatch, useSelector} from "react-redux";
import {hideMessage} from "appRedux/actions/Common";
import {message} from 'antd';

const InfoView = ({useLoading, config}) => {

  const dispatch = useDispatch();

  const error = useSelector(({commonData}) => commonData.error);

  const loading = useSelector(({commonData}) => commonData.loading);

  const displayMessage = useSelector(({commonData}) => commonData.message);

  useEffect(() => {
    if (error || message) {
      // setTimeout(() => {
        dispatch(hideMessage());
      // }, 3000);
    }
  }, [error, displayMessage, dispatch]);

  if (config) message.config(config);

  const showLoading = typeof useLoading === 'undefined' ? true : useLoading;

  return (
    <React.Fragment>
      {showLoading && loading && <div className="gx-loader-view gx-loader-position">
        <CircularProgress/>
      </div>}
      {error && message.error(<span id="message-id">{error}</span>)}
      {displayMessage && message.info(<span id="message-id">{displayMessage}</span>)}
    </React.Fragment>
  );
};

export default React.memo(InfoView);

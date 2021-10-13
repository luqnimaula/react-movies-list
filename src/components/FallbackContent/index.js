import React, {memo} from "react";
import {LoadingOutlined} from "@ant-design/icons";

const FallbackContent = () => (
	<div className="gx-w-100 gx-h-100 gx-text-center gx-mt-5" style={{verticalAlign: 'middle'}}>
        <LoadingOutlined className="gx-fs-icon-lg"/>
    </div>
);

export default memo(FallbackContent);
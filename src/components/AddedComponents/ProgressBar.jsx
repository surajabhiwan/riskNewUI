import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const Progress = () => {
    const [progress, setProgress] = useState(50);
    const location = useLocation();

    useEffect(() => {
        setProgress(50);
    }, [location]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setProgress(100);
        }, 300);
        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <div>
            <LoadingBar color="#facc19" progress={progress} onLoaderFinished={() => setProgress(0)} />
        </div>
    );
};

export default Progress;

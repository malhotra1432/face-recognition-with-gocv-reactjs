import React from 'react';

function CaptureVideo() {
    return (
        <div className="CaptureVideo">
            <div className="container">
                <div className="inner">
                    <div id="video-container">
                        <img id="video" alt={"No video found"} src=" http://192.168.0.102:8080/video"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaptureVideo;
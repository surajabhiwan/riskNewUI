import React, { useEffect, useState } from "react";
import styled from "styled-components";

const VideoPlayer = ({ videoUrl }) => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState(videoUrl);

  useEffect(() => {
    setCurrentVideoUrl(videoUrl);
  }, [videoUrl]);

  return (
    <VideoPlayerContainer>
      <video controls key={currentVideoUrl}>
        <source src={currentVideoUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </VideoPlayerContainer>
  );
};

const VideoPlayerContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  video {
    width: 100%;
    display: block;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
`;

export default VideoPlayer;

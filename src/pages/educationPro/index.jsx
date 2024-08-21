import React, { useState } from "react";
import styled from "styled-components";
import VideoPlayer from "./VideoPlayer"; // Example component for video player
import CourseContent from "./CourseContent"; // Example component for course content

const EducationPro = () => {
  const [selectedVideo, setSelectedVideo] = useState('video.webm');

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <CoursePageContainer>
      <VideoContainer>
        <VideoPlayer videoUrl={selectedVideo} />
      </VideoContainer>
      <ContentContainer>
        <CourseContent onVideoSelect={handleVideoSelect} />
      </ContentContainer>
    </CoursePageContainer>
  );
};

const CoursePageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 80vh;
`;

const VideoContainer = styled.div`
  flex: 3;
  margin-right: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default EducationPro;

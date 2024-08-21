import React from "react";
import styled from "styled-components";

const videoItems = [
  { id: 1, title: 'Introduction', videoUrl: 'video.webm' },
  { id: 2, title: 'Main Topic', videoUrl: 'video1.webm' },
  { id: 3, title: 'Conclusion', videoUrl: 'video2.webm' },
];

const CourseContent = ({ onVideoSelect }) => {
  const handleVideoClick = (videoUrl) => {
    onVideoSelect(videoUrl);
  };

  return (
    <CourseContentContainer>
      <h2>Course Content</h2>
      <ul>
        {videoItems.map((item) => (
          <li key={item.id} onClick={() => handleVideoClick(item.videoUrl)}>
            {item.title}
          </li>
        ))}
      </ul>
    </CourseContentContainer>
  );
};

const CourseContentContainer = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #333;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  li {
    margin-bottom: 10px;
    padding: 10px 15px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }
  }
`;

export default CourseContent;

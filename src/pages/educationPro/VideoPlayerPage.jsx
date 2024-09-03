import React from "react";
import { useParams } from "react-router-dom";
import "./VideoPlayerPage.css"; // Include your CSS for styling
import { Link } from "react-router-dom";

const dummyVideos = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/150/100?random=1",
    title: "Video 1",
    description: "Description for Video 1",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/150/100?random=2",
    title: "Video 2",
    description: "Description for Video 2",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/150/100?random=3",
    title: "Video 3",
    description: "Description for Video 3",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/150/100?random=4",
    title: "Video 4",
    description: "Description for Video 4",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 5,
    thumbnail: "https://picsum.photos/150/100?random=5",
    title: "Video 5",
    description: "Description for Video 5",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 6,
    thumbnail: "https://picsum.photos/150/100?random=6",
    title: "Video 6",
    description: "Description for Video 6",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 7,
    thumbnail: "https://picsum.photos/150/100?random=7",
    title: "Video 7",
    description: "Description for Video 7",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 8,
    thumbnail: "https://picsum.photos/150/100?random=8",
    title: "Video 8",
    description: "Description for Video 8",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 9,
    thumbnail: "https://picsum.photos/150/100?random=9",
    title: "Video 9",
    description: "Description for Video 9",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 10,
    thumbnail: "https://picsum.photos/150/100?random=10",
    title: "Video 10",
    description: "Description for Video 10",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 11,
    thumbnail: "https://picsum.photos/150/100?random=11",
    title: "Video 11",
    description: "Description for Video 11",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 12,
    thumbnail: "https://picsum.photos/150/100?random=12",
    title: "Video 12",
    description: "Description for Video 12",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 13,
    thumbnail: "https://picsum.photos/150/100?random=13",
    title: "Video 13",
    description: "Description for Video 13",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 14,
    thumbnail: "https://picsum.photos/150/100?random=14",
    title: "Video 14",
    description: "Description for Video 14",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 15,
    thumbnail: "https://picsum.photos/150/100?random=15",
    title: "Video 15",
    description: "Description for Video 15",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 16,
    thumbnail: "https://picsum.photos/150/100?random=16",
    title: "Video 16",
    description: "Description for Video 16",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 17,
    thumbnail: "https://picsum.photos/150/100?random=17",
    title: "Video 17",
    description: "Description for Video 17",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 18,
    thumbnail: "https://picsum.photos/150/100?random=18",
    title: "Video 18",
    description: "Description for Video 18",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 19,
    thumbnail: "https://picsum.photos/150/100?random=19",
    title: "Video 19",
    description: "Description for Video 19",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
  {
    id: 20,
    thumbnail: "https://picsum.photos/150/100?random=20",
    title: "Video 20",
    description: "Description for Video 20",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
];

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const video = dummyVideos.find((v) => v.id === parseInt(videoId));

  return (
    <>
      <div className="titleAndSearchBarDiv">
        <h1>{video.title}</h1>
        <div className="searchBar">
          <input type="text" placeholder="search course" />
        </div>
      </div>
      <div className="video-player-page">
        <div className="video-player">
          {/* Replace this with your actual video player component */}
          <video controls>
            <source src={video?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1>{video?.title}</h1>
          <p>{video?.description}</p>
        </div>

        <div className="related-videos">
          <h2>Related Videos</h2>
          {dummyVideos.map((v) => (
            <div key={v.id} className="related-video-item">
              {/* <a href={v.videoUrl} target="_blank" rel="noopener noreferrer">
                <img src={v.thumbnail} alt={v.title} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
              </a> */}
              <Link to={`/video/${v.id}`}>
                {/* <a href={v.videoUrl} target="_blank" rel="noopener noreferrer"> */}
                <img src={v.thumbnail} alt={v.title} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
                {/* </a> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoPlayerPage;

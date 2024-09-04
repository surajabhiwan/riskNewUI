// HomePage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"; // Include your CSS for styling
import { educationProVideoAddNewCourse } from "../../routes/routes";

const dummyVideos = [
  // Your dummy video data
  {
    id: 1,
    thumbnail: "/edu1.png",
    title: "Video 1",
    description: "Description for Video 1",
  },
  {
    id: 2,
    thumbnail: "/edu2.png",

    title: "Video 2",
    description: "Description for Video 2",
  },
  {
    id: 3,
    thumbnail: "/edu3.png",

    title: "Video 3",
    description: "Description for Video 3",
  },
  {
    id: 4,
    thumbnail: "/edu4.png",

    title: "Video 4",
    description: "Description for Video 4",
  },
  {
    id: 5,
    thumbnail: "/edu5.jpg",

    title: "Video 5",
    description: "Description for Video 5",
  },
  {
    id: 6,
    thumbnail: "/edu1.png",
    title: "Video 6",
    description: "Description for Video 6",
  },
  {
    id: 7,
    thumbnail: "/edu2.png",

    title: "Video 7",
    description: "Description for Video 7",
  },
  {
    id: 8,
    thumbnail: "/edu3.png",

    title: "Video 8",
    description: "Description for Video 8",
  },
  {
    id: 9,
    thumbnail: "/edu4.png",

    title: "Video 9",
    description: "Description for Video 9",
  },
  {
    id: 10,
    thumbnail: "/edu5.jpg",

    title: "Video 10",
    description: "Description for Video 10",
  },
  {
    id: 11,
    thumbnail: "/edu1.png",

    title: "Video 11",
    description: "Description for Video 11",
  },
  {
    id: 12,
    thumbnail: "/edu2.png",

    title: "Video 12",
    description: "Description for Video 12",
  },
  {
    id: 13,
    thumbnail: "/edu3.png",

    title: "Video 13",
    description: "Description for Video 13",
  },
  {
    id: 14,
    thumbnail: "/edu4.png",

    title: "Video 14",
    description: "Description for Video 14",
  },
  {
    id: 15,
    thumbnail: "/edu5.jpg",

    title: "Video 15",
    description: "Description for Video 15",
  },
  {
    id: 16,
    thumbnail: "/edu1.png",

    title: "Video 16",
    description: "Description for Video 16",
  },
  {
    id: 17,
    thumbnail: "/edu2.png",

    title: "Video 17",
    description: "Description for Video 17",
  },
  {
    id: 18,
    thumbnail: "/edu3.png",

    title: "Video 18",
    description: "Description for Video 18",
  },
  {
    id: 19,
    thumbnail: "/edu4.png",

    title: "Video 19",
    description: "Description for Video 19",
  },
  {
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },{
    id: 20,
    thumbnail: "/edu5.jpg",

    title: "Video 20",
    description: "Description for Video 20",
  },
];

const EducationPro = () => {
  const navigate = useNavigate();
  const courses = dummyVideos.slice(0, 6); // First 5 videos as courses
  const otherVideos = dummyVideos.slice(6); // Remaining videos
  const addNewCourseHandler = () => {
    navigate(educationProVideoAddNewCourse);
  };
  return (
    <div className="home-page">
      <div className="headingAndNewCourseBtnDiv">
        <h1>Recent Uploads</h1>
        <button className="addNewCourseBtn" onClick={addNewCourseHandler}>
          Add a new Course
        </button>
      </div>
      <div className="course-list">
        {courses.map((video) => (
          <div key={video.id} className="course-item">
            <Link to={`/video/${video.id}`}>
              <img src={video.thumbnail} alt={video.title} />
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* <h1 cla>All Videos</h1> */}
      <div className="video-grid">
        {otherVideos.map((video) => (
          <div key={video.id} className="video-item">
            <Link to={`/video/${video.id}`}>
              <img src={video.thumbnail} alt={video.title} />
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPro;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VideoPlayerPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ip } from "../../baseurl/baseurl";

const VideoPlayerPage = () => {
  const { id, videoId } = useParams(); // Extract course ID and video ID from the URL
  const [videoData, setVideoData] = useState(null); // Data for the current video being played
  const [categories, setCategories] = useState({}); // Data for all categories
  const token = sessionStorage.getItem("authToken");
  const walletAddress = localStorage.getItem("wallet_address");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (!walletAddress) {
          throw new Error("Wallet not connected");
        }




        // Fetch coursuk7uk77e data including categories
        const response = await axios.post(
          `${ip}/api/edu-pro/users/courses/${id}`,
          { walletAddress: walletAddress }
        );
        const data = response.data;

        setCategories({
          Beginner: data.Beginner || [],
          Intermediate: data.Intermediate || [],
          Advanced: data.Advanced || [],
        });

        // If we have a specific videoId from the params, fetch that video
        if (videoId) {
          fetchVideoById(videoId);
        } else {
          // Otherwise, play the first video from the course categories
          const firstVideo =
            data.Beginner[0] || data.Intermediate[0] || data.Advanced[0];
          if (firstVideo) {
            fetchVideoById(firstVideo._id); // Fetch the first video's details
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id, videoId, walletAddress]);

  const fetchVideoById = async (videoId) => {
    try {
      if (!walletAddress) {
        throw new Error("Wallet address not found in local storage.");
      }

      const response = await axios.post(
        `${ip}/api/edu-pro/users/videos/${videoId}`,
        { walletAddress: walletAddress }
      );
      setVideoData(response.data);

      // Call the function to add the video to Recently Watched
      await addToRecentlyWatched(videoId);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const addToRecentlyWatched = async (videoId) => {
    try {
      await axios.post(`${ip}/api/edu-pro/users/addRecentlyWatched`, {
        walletAddress: walletAddress,
        videoId: videoId,
      });
    } catch (error) {
      console.error("Error adding to recently watched:", error);
    }
  };

  const handleVideoClick = (videoId) => {
    fetchVideoById(videoId); // Fetch the clicked video's data
  };

  return (
    <div className="video-player-page">
      <div className="main-video-player">
        <div className="video-player">
          {videoData && (
            <video controls>
              <source src={videoData?.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {videoData && (
            <>
              <h1>{videoData.name}</h1>
              <p>{videoData.description}</p>
            </>
          )}
        </div>
      </div>

      <div className="categories-list">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <ul>
              {categories[category].map((video) => (
                <li key={video._id} className="video-card">
                  <Link
                    to={`/course/${id}/video/${video._id}`} // Update the link to include the video ID
                    onClick={() => handleVideoClick(video._id)} // Fetch the clicked video's data
                    className="video-link"
                  >
                    <div className="thumbnail-wrapper">
                      <img
                        src={video?.thumbnail}
                        alt={video?.name}
                        className="thumbnail-image"
                      />
                    </div>
                    <h3>{video.name}</h3>
                    <p className="description">{video.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayerPage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
// Import the ProLanding component
import "./index.css";
import { ip } from "../../baseurl/baseurl";
import ProLanding from "../../components/Pro/ProLanding";

const EducationPro = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [otherVideos, setOtherVideos] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State to track authentication
  console.log("recently watched", recentlyWatched);
  useEffect(() => {
    const checkAuthentication = () => {
      const walletAddress = localStorage.getItem("wallet_address");
      const authenticatedUser = localStorage.getItem("authenticated_user_pro");
      const authenticatedUserFinal = JSON.parse(authenticatedUser);
      console.log(
        "education pro authentication",
        JSON.parse(authenticatedUser)
      );
      if (!walletAddress) {
        console.log("walletAddress iamsun", walletAddress);
        toast.error("Please connect to the wallet first.");
        navigate("/login");
        return false;
      } else if (!authenticatedUserFinal?.access?.educationPro) {
        setIsAuthenticated(false);
        return false;
      } else {
        return true;
      }

      const user = JSON.parse(authenticatedUserFinal);
      // if (user.success !== true) {
      //   toast.error("User authentication failed. Redirecting to login.");
      //   navigate("/login");
      //   return false;
      // }
    };

    const fetchCourses = async () => {
      try {
        if (!checkAuthentication()) return;

        console.log("walletAddress at fetch courses");
        const walletAddress = localStorage.getItem("wallet_address");
        const coursesResponse = await axios.post(
          `${ip}/api/edu-pro/users/courses`,
          { walletAddress },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const coursesData = coursesResponse.data;
        localStorage.setItem("courses", JSON.stringify(coursesData));
        setOtherVideos(coursesData); // Remaining items
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses.");
      }
    };

    const fetchRecentlyWatched = async () => {
      try {
        const walletAddress = localStorage.getItem("wallet_address");
        if (!walletAddress) {
          throw new Error("Wallet address not found in local storage.");
        }

        const recentlyWatchedResponse = await axios.post(
          `${ip}/api/edu-pro/users/getRecentlyWatched`,
          { walletAddress },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const recentlyWatchedData =
          recentlyWatchedResponse.data?.recentlyWatchedVideos;
        setRecentlyWatched(recentlyWatchedData);
      } catch (error) {
        console.error("Error fetching recently watched videos:", error);
        // toast.error("Failed to fetch recently watched videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    fetchRecentlyWatched();

    const handleWalletDisconnect = () => {
      if (!checkAuthentication()) {
        toast.error("Wallet disconnected. Redirecting to home.");
      }
    };

    window.addEventListener("walletDisconnect", handleWalletDisconnect);

    return () => {
      window.removeEventListener("walletDisconnect", handleWalletDisconnect);
    };
  }, [navigate]);

  if (!isAuthenticated) {
    return <ProLanding></ProLanding>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="headingAndNewCourseBtnDiv">
        <h1>Recently Watched</h1>
      </div>
      <div className="course-list">
        {recentlyWatched.length > 0 ? (
          recentlyWatched.map((video) => (
            <div key={video.id} className="course-item">
              <Link to={`/course/${video?.course}/video/${video?.video?._id}`}>
                <img src={video?.video?.thumbnail} alt={video?.video?.name} />
                <h3 className="description">{video?.video?.name}</h3>
                <p className="description">{video?.video?.description}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No recently watched videos available.</p>
        )}
      </div>

      <h1>All Courses</h1>
      <div className="video-grid">
        {otherVideos?.map((video) => (
          <div key={video.id} className="video-item">
            <Link to={`/course/${video?._id}`}>
              <img src={video.previewLink} alt={video.title} />
              <h3 className="description">{video.name}</h3>
              <p className="description">{video?.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPro;

import React, { useRef, useState } from "react";
import styles from "./AddNewCourse.module.css";
import Modal from "./Modal";

const AddNewCourse = () => {
  const fileInputRef = useRef(null);
  const fileInputRefMain = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFileUploadClickMain = () => {
    fileInputRefMain?.current?.click();
  };
  const handleFileUploadClick = () => {
    fileInputRef?.current?.click();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.OuterDiv}>
      <div className={styles.addNewCourseOuterDiv}>
        <div className={styles.addPreview} onClick={handleFileUploadClickMain}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.plusSvg}
          >
            <rect
              x="0.672852"
              y="0.959473"
              width="25.6479"
              height="25.6479"
              rx="12.824"
              fill="white"
            />
            <path
              d="M14.5957 7.74607C14.5957 7.13827 14.1047 6.64722 13.4968 6.64722C12.889 6.64722 12.3979 7.13827 12.3979 7.74607V12.6909H7.45269C6.84484 12.6909 6.35376 13.182 6.35376 13.7898C6.35376 14.3976 6.84484 14.8886 7.45269 14.8886H12.3979V19.8335C12.3979 20.4413 12.889 20.9323 13.4968 20.9323C14.1047 20.9323 14.5957 20.4413 14.5957 19.8335V14.8886H19.5409C20.1488 14.8886 20.6399 14.3976 20.6399 13.7898C20.6399 13.182 20.1488 12.6909 19.5409 12.6909H14.5957V7.74607Z"
              fill="black"
            />
          </svg>
          <h3>Upload Video</h3>
          {/* Invisible file input */}
          <input
            type="file"
            accept="video/*"
            ref={fileInputRefMain}
            style={{ display: "none" }}
            onChange={(e) => console.log(e.target.files[0])} // handle file upload here
          />
        </div>
        <div className={styles.TitleAndDescriptionDiv}>
          <div className={styles.title}>
            <input type="text" placeholder="Course Title" />
          </div>
          <div className={styles.description}>
            <textarea placeholder="Description"></textarea>
          </div>
        </div>
      </div>
      <button className={styles.addNewVideoBtn} onClick={openModal}>
        Add Video
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={styles.addNewCourseOuterDiv}>
          <div className={styles.addPreview} onClick={handleFileUploadClick}>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.plusSvg}
            >
              <rect
                x="0.672852"
                y="0.959473"
                width="25.6479"
                height="25.6479"
                rx="12.824"
                fill="white"
              />
              <path
                d="M14.5957 7.74607C14.5957 7.13827 14.1047 6.64722 13.4968 6.64722C12.889 6.64722 12.3979 7.13827 12.3979 7.74607V12.6909H7.45269C6.84484 12.6909 6.35376 13.182 6.35376 13.7898C6.35376 14.3976 6.84484 14.8886 7.45269 14.8886H12.3979V19.8335C12.3979 20.4413 12.889 20.9323 13.4968 20.9323C14.1047 20.9323 14.5957 20.4413 14.5957 19.8335V14.8886H19.5409C20.1488 14.8886 20.6399 14.3976 20.6399 13.7898C20.6399 13.182 20.1488 12.6909 19.5409 12.6909H14.5957V7.74607Z"
                fill="black"
              />
            </svg>
            <h3>Upload Video</h3>
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => console.log(e.target.files[0])} // handle file upload here
            />
          </div>
          <div className={styles.TitleAndDescriptionDiv}>
            <div className={styles.title}>
              <input type="text" placeholder="Video Title" />
            </div>
            <div className={styles.description}>
              <textarea placeholder="Description"></textarea>
            </div>
          </div>
        </div>
        <button className={styles.addNewVideoBtn}>Add Video</button>
      </Modal>
    </div>
  );
};

export default AddNewCourse;

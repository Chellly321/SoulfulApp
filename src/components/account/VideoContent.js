import { Fragment } from "react";
import ReactPlayer from "react-player";

function VideoContent({ selectedModule }) {
  console.log(selectedModule);
  return (
    <Fragment>
      {selectedModule.length > 0 ? (
        <div className="video-player">
          <ReactPlayer
            controls={true}
            url={selectedModule.length > 0 && selectedModule[0].video}
          />
        </div>
      ) : (
        <div className="video-content-container">
          <div className="video-content-container_video-placeholder cross">
            <h1>Kies een module</h1>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default VideoContent;

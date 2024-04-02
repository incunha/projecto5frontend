import './background-video.css';

function BackgroundLoginVideo() {
  return (
    
    <div className="video-container">
      <video autoPlay muted loop id="background-video">
        <source src="multimedia/loop_video_final.mp4" type="video/mp4" />
        Your browser does not support video tag.
      </video>
      <div className="overlay"></div>
    </div>
  );
}

export default BackgroundLoginVideo;
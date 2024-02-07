"use client";

import ReactPlayer, { ReactPlayerProps } from "react-player";

const VideoPlayer: React.FC<ReactPlayerProps> = (props) => {
  return <ReactPlayer {...props} />
}

export default VideoPlayer;

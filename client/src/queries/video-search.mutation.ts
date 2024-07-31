import { useMutation } from "@tanstack/react-query";
import { VIDEO_API_PATH } from "../config/api.config";
import { VideoData } from "../types";
import { ResponseError } from "../types/error.types";
import axios from "../utils/axios";

interface VideoSearchRequest {
  url: string;
}

export const useVideoSearchMutation = () => {
  return useMutation<VideoData, ResponseError, VideoSearchRequest>({
    mutationKey: ["video-search"],
    mutationFn: async (data: VideoSearchRequest) => {
      var res = await axios.post<VideoData>(VIDEO_API_PATH, data);
      return res.data;
    },
  });
};

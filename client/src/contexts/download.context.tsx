import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSocketContext } from "./socket.context";
import {
  DownloadStatusEnum,
  IDownloadMessage,
  IDownloadResult,
  IEventDownloadProgress,
} from "../types";
import { EVENT_DOWNLOAD_VIDEO_PROGRESS } from "../config/events.config";

interface Props {
  children: React.ReactNode;
}
interface IDownloadProgressState extends IDownloadMessage, IDownloadResult {}
interface IDownloadProgressContext {
  downloadProgress: IDownloadProgressState;
  clearProgress: () => void;
  completeProgress: () => void;
}

export const downloadProgressInitialValue: IDownloadProgressState = {
  downloaded: 0,
  total: 0,
  status: DownloadStatusEnum.Pending,
};

const DownloadProgressContext = createContext<IDownloadProgressContext>(null!);
const DownloadProgressContextProvider = (props: Props) => {
  const { lastMessage } = useSocketContext();
  const [downloadProgress, _setDownloadProgress] =
    useState<IDownloadProgressState>(downloadProgressInitialValue);

  useEffect(() => {
    if (lastMessage?.data) {
      let data = JSON.parse(lastMessage?.data) as IEventDownloadProgress;
      if (data.event === EVENT_DOWNLOAD_VIDEO_PROGRESS) {
        _setDownloadProgress((state) => ({
          ...state,
          ...data.data,
        }));
      }
    }
  }, [lastMessage]);

  const clearProgress = useCallback(() => {
    _setDownloadProgress(downloadProgressInitialValue);
  }, [_setDownloadProgress]);

  const completeProgress = useCallback(() => {
    _setDownloadProgress((state) => ({
      ...state,
      status: "Success",
      downloaded: state.total,
    }));
  }, [_setDownloadProgress]);

  const value = useMemo(
    () => ({ downloadProgress, clearProgress, completeProgress }),
    [downloadProgress, clearProgress, completeProgress]
  );

  return (
    <DownloadProgressContext.Provider value={value}>
      {props.children}
    </DownloadProgressContext.Provider>
  );
};

const useDownloadProgressContext = (): IDownloadProgressContext => {
  const context = useContext(DownloadProgressContext);
  if (!context) {
    throw new Error(
      "useDownloadProgressContext must be used within a DownloadProgressContextProvider"
    );
  }
  return context;
};

export { DownloadProgressContextProvider, useDownloadProgressContext };

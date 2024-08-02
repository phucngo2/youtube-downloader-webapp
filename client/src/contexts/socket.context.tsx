import { createContext, useContext, useEffect, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WEBSOCKET_ENDPOINT } from "../config/endpoint.config";

interface Props {
  children: React.ReactNode;
}

interface ISocketContext {
  lastMessage: MessageEvent<string> | null;
}

const SocketContext = createContext<ISocketContext>(null!);
const SocketContextProvider = (props: Props) => {
  const { lastMessage, readyState } = useWebSocket(WEBSOCKET_ENDPOINT);
  const value = useMemo(
    () => ({
      lastMessage: lastMessage as MessageEvent<string>,
    }),
    [lastMessage]
  );

  useEffect(() => {
    if (readyState == ReadyState.OPEN) {
      console.log("🚀 Socket connected!");
    }
  }, [readyState]);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export { SocketContextProvider, useSocketContext };

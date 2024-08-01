import { createContext, useContext, useMemo } from "react";
import useWebSocket from "react-use-websocket";
import { WEBSOCKET_ENDPOINT } from "../config/endpoint.config";

interface Props {
  children: React.ReactNode;
}

interface ISocketContext {
  lastMessage: MessageEvent<any> | null;
}

const SocketContext = createContext<ISocketContext>(null!);
const SocketContextProvider = (props: Props) => {
  const { lastMessage } = useWebSocket(WEBSOCKET_ENDPOINT);
  const value = useMemo(() => ({ lastMessage }), [lastMessage]);

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

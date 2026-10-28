import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { socket } from "../lib/socket";

type AvailabilityContextValue = {
  soldIds: string[];
  isSold: (nftId: string) => boolean;
};

const AvailabilityContext =
  createContext<AvailabilityContextValue | null>(null);

export function NFTAvailabilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [soldIds, setSoldIds] = useState<string[]>([]);

  useEffect(() => {
    function handleAvailability(data: { soldIds: string[] }) {
      setSoldIds(data.soldIds);
    }

    function handleUpdated(data: { nftId: string }) {
      setSoldIds((previous) =>
        previous.includes(data.nftId)
          ? previous
          : [...previous, data.nftId],
      );
    }

    socket.on("nft:availability", handleAvailability);
    socket.on("nft:updated", handleUpdated);

    return () => {
      socket.off("nft:availability", handleAvailability);
      socket.off("nft:updated", handleUpdated);
    };
  }, []);

  return (
    <AvailabilityContext.Provider
      value={{
        soldIds,
        isSold: (nftId) => soldIds.includes(nftId),
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNFTAvailability() {
  const context = useContext(AvailabilityContext);

  if (!context) {
    throw new Error("NFTAvailabilityProvider ausente");
  }

  return context;
}
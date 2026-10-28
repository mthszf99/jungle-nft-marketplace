import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socket } from "../lib/socket";

interface NFTUpdatedEvent {
  nftId: string;
  status: "sold";
  timestamp: string;
}

export function useNFTSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Desativa a conexão em testes E2E tradicionais.
    const isE2E = import.meta.env.VITE_E2E === "true";

    if (isE2E) {
      return;
    }

    if (!import.meta.env.DEV && !import.meta.env.VITE_SOCKET_URL) {
      return;
    }

    function handleNFTUpdated(event: NFTUpdatedEvent) {
      console.log("NFT atualizado:", event);

      void queryClient.invalidateQueries({
        queryKey: ["nfts"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["nft", event.nftId],
      });
    }

    socket.on("nft:updated", handleNFTUpdated);
    socket.connect();

    return () => {
      socket.off("nft:updated", handleNFTUpdated);
      socket.disconnect();
    };
  }, [queryClient]);
}
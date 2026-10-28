import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = 3001;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:4173",
    ],
  },
});

type PurchaseRequest = {
  orderId: string;
  nftIds: string[];
};

type PurchaseResponse =
  | {
      success: true;
      orderId: string;
    }
  | {
      success: false;
      message: string;
    };

const soldNFTs = new Set<string>();

const processedOrders = new Map<
  string,
  {
    nftIds: string[];
    response: PurchaseResponse;
  }
>();

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.emit("nft:availability", {
    soldIds: [...soldNFTs],
  });

  socket.on(
    "nft:purchase",
    (
      data: PurchaseRequest,
      callback: (response: PurchaseResponse) => void,
    ) => {
      if (
        !data ||
        typeof data.orderId !== "string" ||
        !data.orderId.trim() ||
        !Array.isArray(data.nftIds) ||
        !data.nftIds.length ||
        data.nftIds.some(
          (id) => typeof id !== "string" || !id.trim(),
        ) ||
        new Set(data.nftIds).size !== data.nftIds.length
      ) {
        callback({
          success: false,
          message: "Pedido inválido.",
        });

        return;
      }

      const previous = processedOrders.get(data.orderId);

      if (previous) {
        const sameItems =
          previous.nftIds.length === data.nftIds.length &&
          previous.nftIds.every((id) =>
            data.nftIds.includes(id),
          );

        if (!sameItems) {
          callback({
            success: false,
            message: "Chave de pedido já utilizada.",
          });

          return;
        }

        callback(previous.response);
        return;
      }

      const unavailable = data.nftIds.filter((id) =>
        soldNFTs.has(id),
      );

      if (unavailable.length) {
        callback({
          success: false,
          message: `NFT indisponível: ${unavailable.join(", ")}`,
        });

        return;
      }

      // Reserva todos os NFTs sem operações assíncronas intermediárias.
      for (const nftId of data.nftIds) {
        soldNFTs.add(nftId);
      }

      const response: PurchaseResponse = {
        success: true,
        orderId: data.orderId,
      };

      processedOrders.set(data.orderId, {
        nftIds: [...data.nftIds],
        response,
      });

      callback(response);

      for (const nftId of data.nftIds) {
        io.emit("nft:updated", {
          nftId,
          status: "sold",
          timestamp: new Date().toISOString(),
        });
      }
    },
  );

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.IO ativo na porta ${PORT}`);
});
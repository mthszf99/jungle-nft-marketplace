import { socket } from "../lib/socket";

export type PurchaseResponse =
  | {
      success: true;
      orderId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function requestPurchase(
  orderId: string,
  nftIds: string[],
): Promise<PurchaseResponse> {
  // Testes E2E: compra simulada.
  if (import.meta.env.VITE_E2E === "true") {
    return {
      success: true,
      orderId,
    };
  }

  // Produção sem servidor Socket.IO configurado:
  // mantém o checkout demonstrativo funcionando.
  if (
    import.meta.env.PROD &&
    !import.meta.env.VITE_SOCKET_URL
  ) {
    return {
      success: true,
      orderId,
    };
  }

  // Desenvolvimento: exige conexão com o servidor.
  if (!socket.connected) {
    throw new Error(
      "Servidor de compras indisponível. Tente novamente.",
    );
  }

  try {
    const response: PurchaseResponse = await socket
      .timeout(5000)
      .emitWithAck("nft:purchase", {
        orderId,
        nftIds,
      });

    return response;
  } catch {
    throw new Error(
      "Não foi possível confirmar a compra. Tente novamente.",
    );
  }
}
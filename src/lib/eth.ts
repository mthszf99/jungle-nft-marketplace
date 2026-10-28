export function toWei(value: string): bigint {
  if (!/^(0|[1-9]\d*)(\.\d{1,18})?$/.test(value)) throw new Error("Valor ETH inválido");
  const [whole, fractional = ""] = value.split(".");
  return BigInt(whole) * 10n ** 18n + BigInt(fractional.padEnd(18, "0"));
}
export function fromWei(value: bigint): string {
  const whole = value / 10n ** 18n;
  const fractional = (value % 10n ** 18n).toString().padStart(18, "0").replace(/0+$/, "");
  return fractional ? `${whole}.${fractional}` : String(whole);
}
export function totalEth(values: string[]): string {
  return fromWei(values.reduce((sum, price) => sum + toWei(price), 0n));
}

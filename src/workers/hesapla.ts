// özel bir şey değil, sadece CPU'yu çok kullanan bir hesaplama görevi
export function hesapla(sayi: number, ustu: number): number {
  let result = 0
  let i = 0
  const len = Math.pow(sayi, ustu)
  while (i < len) {
    result += Math.sin(i) * Math.sin(i) + Math.cos(i) * Math.cos(i)
    i++
  }

  return result
}

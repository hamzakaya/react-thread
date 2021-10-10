import { hesapla as asyncHesapla } from './hesapla'

export async function hesapla(a: number, b: number): Promise<number> {
  return asyncHesapla(a, b)
}

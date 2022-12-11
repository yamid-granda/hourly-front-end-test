import { KELVIN_CONSTANT } from '../configs'
import { formatNumber } from '@/utils'

export function parseKelvinToCelsius(kelvin) {
  return formatNumber(kelvin - KELVIN_CONSTANT)
}

export function parseCelsiusToKelvin(celsius) {
  return celsius + KELVIN_CONSTANT
}

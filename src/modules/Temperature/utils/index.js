import { formatNumber } from "@/utils"
import { KELVIN_CONSTANT } from "../configs"

export function parseKelvinToCelsius(kelvin) {
  return formatNumber(kelvin - KELVIN_CONSTANT)
}

export function parseCelsiusToKelvin(celsius) {
  return celsius + KELVIN_CONSTANT
}

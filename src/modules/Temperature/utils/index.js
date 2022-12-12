import {
  FAHRENHEIT_ADDER,
  FAHRENHEIT_MULTIPLIER,
  KELVIN_CONSTANT,
} from '../configs'
import { formatNumber } from '@/utils'

// Celsius

export function parseCelsiusToKelvin(celsius) {
  return formatNumber(celsius + KELVIN_CONSTANT)
}

export function parseCelsiusToFahrenheit(celsius) {
  return formatNumber(celsius * FAHRENHEIT_MULTIPLIER + FAHRENHEIT_ADDER)
}

// Kelvin

export function parseKelvinToCelsius(kelvin) {
  return formatNumber(kelvin - KELVIN_CONSTANT)
}

export function parseKelvinToFahrenheit(kelvin) {
  const celsius = parseKelvinToCelsius(kelvin)
  return parseCelsiusToFahrenheit(parseFloat(celsius))
}

// Fahrenheit

export function parseFahrenheitToCelsius(fahrenheit) {
  return formatNumber((fahrenheit - FAHRENHEIT_ADDER) / FAHRENHEIT_MULTIPLIER)
}

export function parseFahrenheitToKelvin(fahrenheit) {
  const celsius = parseFahrenheitToCelsius(fahrenheit)
  return parseCelsiusToKelvin(parseFloat(celsius))
}

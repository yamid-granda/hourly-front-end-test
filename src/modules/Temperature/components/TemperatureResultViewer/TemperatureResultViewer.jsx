import { useMemo } from 'react'
import {
  parseCelsiusToFahrenheit,
  parseCelsiusToKelvin,
  parseFahrenheitToCelsius,
  parseFahrenheitToKelvin,
  parseKelvinToCelsius,
  parseKelvinToFahrenheit,
} from '../../utils'
import { formatNumber } from '@/utils'
import './TemperatureResultViewer.scss'

const scaleTranslatorsDic = {
  celsius: grades => ({
    celsius: formatNumber(grades),
    kelvin: parseCelsiusToKelvin(grades),
    fahrenheit: parseCelsiusToFahrenheit(grades),
  }),
  kelvin: grades => ({
    celsius: parseKelvinToCelsius(grades),
    kelvin: formatNumber(grades),
    fahrenheit: parseKelvinToFahrenheit(grades),
  }),
  fahrenheit: grades => ({
    celsius: parseFahrenheitToCelsius(grades),
    kelvin: parseFahrenheitToKelvin(grades),
    fahrenheit: formatNumber(grades),
  }),
}

export default function TemperatureResultViewer({
  data,
}) {
  const temperatures = useMemo(() => {
    const grades = parseFloat(data.grades)
    const scaleTranslator = scaleTranslatorsDic[data.scale]
    const allowsTranslation = data.scale && data.grades && scaleTranslator

    if (allowsTranslation)
      return scaleTranslator(grades)

    return {
      celsius: '0',
      kelvin: '0',
      fahrenheit: '0',
    }
  }, [data])

  return (
    <div
      className="ss-result-viewer"
      data-testid="temperature-converter-result"
    >
      <h1 data-testid="title">Result</h1>

      <div className="ss-result_values">
        <div
          className="ss-result_value"
          data-testid="celsius"
        >
          Celsius: {temperatures.celsius}
        </div>

        <div
          className="ss-result_value"
          data-testid="kelvin"
        >
          Kelvin: {temperatures.kelvin}
        </div>

        <div
          className="ss-result_value"
          data-testid="fahrenheit"
        >
          Fahrenheit: {temperatures.fahrenheit}
        </div>
      </div>
    </div>
  )
}

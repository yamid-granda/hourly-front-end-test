import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import TemperatureConverter from '../TemperatureConverter.jsx'

beforeEach(() => {
  render(
    <div>
      <TemperatureConverter />
      <div id="portal"></div>
    </div>,
  )
})

afterEach(() => {
  cleanup()
})

describe('temperature conversion', () => {
  it('on set Celsius shows Celsius, Kelvin and Fahrenheit', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '123.14' } })

    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = await within(scaleSelect).findByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const celsiusOption = await within(scaleSelectOptions).findByTestId('option-celsius')
    fireEvent.input(celsiusOption)

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')
    const fahrenheitOutput = screen.getByTestId('fahrenheit')

    expect(celsiusOutput.textContent).toBe('Celsius: 123.14')
    expect(kelvinOutput.textContent).toBe('Kelvin: 396.29')
    expect(fahrenheitOutput.textContent).toBe('Fahrenheit: 253.65')
  })

  it('on set Kelvin shows Celsius, Kelvin and Fahrenheit', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '123' } })

    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = await within(scaleSelect).findByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const kelvinOption = await within(scaleSelectOptions).findByTestId('option-kelvin')
    fireEvent.input(kelvinOption)

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')
    const fahrenheitOutput = screen.getByTestId('fahrenheit')

    expect(celsiusOutput.textContent).toBe('Celsius: -150.15')
    expect(kelvinOutput.textContent).toBe('Kelvin: 123')
    expect(fahrenheitOutput.textContent).toBe('Fahrenheit: -238.27')
  })

  it('on set Fahrenheit shows Celsius, Kelvin and Fahrenheit', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '-15' } })

    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = await within(scaleSelect).findByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const kelvinOption = await within(scaleSelectOptions).findByTestId('option-fahrenheit')
    fireEvent.input(kelvinOption)

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')
    const fahrenheitOutput = screen.getByTestId('fahrenheit')

    expect(celsiusOutput.textContent).toBe('Celsius: -26.11')
    expect(kelvinOutput.textContent).toBe('Kelvin: 247.04')
    expect(fahrenheitOutput.textContent).toBe('Fahrenheit: -15')
  })

  it('on set Kelvin shows Celsius and Kelvin', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '123' } })

    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = await within(scaleSelect).findByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const kelvinOption = await within(scaleSelectOptions).findByTestId('option-kelvin')
    fireEvent.input(kelvinOption)

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')
    const fahrenheitOutput = screen.getByTestId('fahrenheit')

    expect(celsiusOutput.textContent).toBe('Celsius: -150.15')
    expect(kelvinOutput.textContent).toBe('Kelvin: 123')
    expect(fahrenheitOutput.textContent).toBe('Fahrenheit: -238.27')
  })

  it('when not has scale shows results as 0', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '123' } })

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')
    const fahrenheitOutput = screen.getByTestId('fahrenheit')

    expect(celsiusOutput.textContent).toBe('Celsius: 0')
    expect(kelvinOutput.textContent).toBe('Kelvin: 0')
    expect(fahrenheitOutput.textContent).toBe('Fahrenheit: 0')
  })

  it('when not has grades shows results as 0', async () => {
    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = within(scaleSelect).getByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const kelvinOption = within(scaleSelectOptions).getByTestId('option-kelvin')
    fireEvent.input(kelvinOption)

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')
    const fahrenheitOutput = screen.getByTestId('fahrenheit')

    expect(celsiusOutput.textContent).toBe('Celsius: 0')
    expect(kelvinOutput.textContent).toBe('Kelvin: 0')
    expect(fahrenheitOutput.textContent).toBe('Fahrenheit: 0')
  })

  it('starts results as 0', async () => {
    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')
    const fahrenheitOutput = screen.getByTestId('fahrenheit')

    expect(celsiusOutput.textContent).toBe('Celsius: 0')
    expect(kelvinOutput.textContent).toBe('Kelvin: 0')
    expect(fahrenheitOutput.textContent).toBe('Fahrenheit: 0')
  })
})

describe('literals', () => {
  it('has the right title', async () => {
    const temperatureConverter = screen.getByTestId('temperature-converter')
    const head = within(temperatureConverter).getByTestId('head')
    const title = within(head).getByTestId('title')
    expect(title.textContent).toBe('Temperature Converter:')
  })

  it('result has the right title', async () => {
    const temperatureConverter = screen.getByTestId('temperature-converter-result')
    const title = within(temperatureConverter).getByTestId('title')
    expect(title.textContent).toBe('Result')
  })
})

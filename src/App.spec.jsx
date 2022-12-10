import { render, screen, within, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import App from './App.jsx'

let unmountComponent

beforeEach(() => {
  cleanup()
  const { unmount } = render(
    <div>
      <App root={root} />
      <div id="portal"></div>
    </div>
  )

  unmountComponent = unmount
});

afterEach(() => {
  unmountComponent()
  cleanup()
});

describe('Temperature Converter', () => {
  it('on set Celsius value shows Celsius and Kelvin', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '123' }});

    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = await within(scaleSelect).findByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const celsiusOption = await within(scaleSelectOptions).findByTestId('option-celsius')
    fireEvent.input(celsiusOption);

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')

    expect(celsiusOutput.textContent).toBe('Celsius: 123')
    expect(kelvinOutput.textContent).toBe('Kelvin: 396.15')
  })

  it('on set Kelvin value shows Celsius and Kelvin', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '123' }});

    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = await within(scaleSelect).findByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const kelvinOption = await within(scaleSelectOptions).findByTestId('option-kelvin')
    fireEvent.input(kelvinOption);

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')

    expect(celsiusOutput.textContent).toBe('Celsius: -150.15')
    expect(kelvinOutput.textContent).toBe('Kelvin: 123')
  })

  it('when not has scale shows results as 0', async () => {
    const gradesInput = screen.getByTestId('grades')
    fireEvent.input(gradesInput, { target: { value: '123' }});

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')

    expect(celsiusOutput.textContent).toBe('Celsius: 0')
    expect(kelvinOutput.textContent).toBe('Kelvin: 0')
  })

  it('when not has grades shows results as 0', async () => {
    const scaleSelect = screen.getByTestId('scale')
    const scaleSelectSearch = within(scaleSelect).getByTestId('search')
    fireEvent.click(scaleSelectSearch)

    const scaleSelectOptions = screen.getByTestId('scale-options')
    const kelvinOption = within(scaleSelectOptions).getByTestId('option-kelvin')
    fireEvent.input(kelvinOption);

    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')

    expect(celsiusOutput.textContent).toBe('Celsius: 0')
    expect(kelvinOutput.textContent).toBe('Kelvin: 0')
  })

  it('starts results as 0', async () => {
    const celsiusOutput = screen.getByTestId('celsius')
    const kelvinOutput = screen.getByTestId('kelvin')

    expect(celsiusOutput.textContent).toBe('Celsius: 0')
    expect(kelvinOutput.textContent).toBe('Kelvin: 0')
  })

  it('temperature converter has the right title', async () => {
    const temperatureConverter = screen.getByTestId('temperature-converter')
    const title = within(temperatureConverter).getByTestId('title')
    expect(title.textContent).toBe('Temperature Converter:')
  })

  it('temperature converter result has the right title', async () => {
    const temperatureConverter = screen.getByTestId('temperature-converter-result')
    const title = within(temperatureConverter).getByTestId('title')
    expect(title.textContent).toBe('Result')
  })
})
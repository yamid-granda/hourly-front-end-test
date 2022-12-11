import { useState } from 'react'
import TemperatureResultViewer from '../TemperatureResultViewer/TemperatureResultViewer'
import logo from '@/assets/logo.svg'
import FormInput from '@/components/FormInput/FormInput'
import Input from '@/components/Input/Input'
import SingleSelect from '@/components/SingleSelect/SingleSelect'
import './TemperatureConverter.scss'

const scaleSelectOptions = [
  { value: 'celsius', text: 'Celsius' },
  { value: 'kelvin', text: 'Kelvin' },
]

export default function TemperatureConverter() {
  const [formData, setFormData] = useState({
    grades: '',
    scale: null,
  })

  function onGradesChange(event) {
    setFormData({ ...formData, grades: event.target.value })
  }

  function onScaleChange(scale) {
    setFormData({ ...formData, scale })
  }

  return (
    <div
      className="ss-temperature-converter"
      data-testid="temperature-converter"
    >
      <div
        className="ss-temperature-converter__head"
        data-testid="head"
      >
        <div className='ss-temperature-converter__logo'>
          <img src={logo} alt="temperature converter" />
        </div>

        <h1
          data-testid="title"
          className='ss-temperature-converter__title'
        >
          Temperature Converter:
        </h1>
      </div>

      <FormInput>
        <Input
          value={formData.grades}
          onInput={onGradesChange}
          type="number"
          placeholder="Enter Value"
          name="grades"
          testId="grades"
        />
      </FormInput>

      <FormInput>
        <SingleSelect
          value={formData.scale}
          options={scaleSelectOptions}
          name="scale"
          onChange={onScaleChange}
          placeholder="Scale Selection"
          testId="scale"
        />
      </FormInput>

      <TemperatureResultViewer data={formData} />
    </div>
  )
}

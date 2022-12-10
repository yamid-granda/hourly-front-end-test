import logo from './assets/logo.svg'
import { useState } from 'react'
import './App.scss'
import Input from './components/Input/Input'
import SingleSelect from './components/SingleSelect/SingleSelect'
import ResultViewer from './components/ResultViewer/ResultViewer';
import FormInput from './components/FormInput/FormInput';

function App() {
  const [formData, setFormData] = useState({
    grades: '',
    scale: null,
  })

  const [scaleSelectOptions] = useState([
    { value: 'celsius', text: 'Celsius' },
    { value: 'kelvin', text: 'Kelvin' },
  ]);

  function onGradesChange(event) {
    setFormData({ ...formData, grades: event.target.value })
  }

  function onScaleChange(scale) {
    setFormData({ ...formData, scale })
  }

  return (
    <div className="ss-app">
      <div data-testid="temperature-converter">
        <div className='ss-app-logo'>
          <img src={logo} alt="temperature converter" />
        </div>
        <h1
          data-testid="title"
          className='ss-app-title'
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

      <ResultViewer data={formData} />
    </div>
  )
}

export default App

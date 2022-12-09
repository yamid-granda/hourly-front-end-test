import logo from './assets/logo.svg'
import { useState } from 'react'
import './App.scss'
import Input from './components/Input/Input'
import SingleSelect from './components/SingleSelect/SingleSelect'
import { useDispatch } from 'react-redux';
import { addTemperature } from './store/modules/Temperature';
import { useSelector } from 'react-redux';
import ResultViewer from './components/ResultViewer/ResultViewer';
import FormInput from './components/FormInput/FormInput';

function App() {
  // const temperature = useSelector(state => state.temperature)

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    grades: '',
    scale: null,
  })
  

  const [scaleSelectOptions, setScaleSelectOptions] = useState([
    { value: 'celsius', text: 'Celsius' },
    { value: 'kelvin', text: 'Kelvin' },
  ]);

  function onGradesChange(event) {
    setFormData({ ...formData, grades: event.target.value })
    dispatch(addTemperature, formData)
  }

  function onScaleChange(scale) {
    setFormData({ ...formData, scale })
  }

  return (
    <div className="ss-app">
      <div className='ss-app-logo'>
        <img src={logo} alt="temperature converter" />
      </div>

      <h1 className='ss-app-title'>Temperature Converter:</h1>

      <FormInput>
        <Input
          value={formData.grades}
          onInput={onGradesChange}
          type="number"
          placeholder="Enter Value"
        />
      </FormInput>

      <FormInput>
        <SingleSelect
          value={formData.scale}
          options={scaleSelectOptions}
          name="scale"
          onChange={onScaleChange}
          placeholder="Scale Selection"
        />
      </FormInput>

      <ResultViewer data={formData} />
    </div>
  )
}

export default App

export default function Test1() {
  const [count, setCount] = useState(0)

  const [focusInputChallengeValue, setFocusInputChallengeValue] = useState('')

  const [isFocus, setIsFocus] = useState(false)

  const [formData, setFormData] = useState(() => ({ input1: '', input2: '' }))

  function onInput1(input1) {
    setFormData({ ...formData, input1 })
  }
  
  function onInput2(input2) {
    setFormData({ ...formData, input2 })
  }

  return (
    <div className="App">
      <pre>{ JSON.stringify(formData, null, 2) }</pre>

      <Input value={formData.input1} onInput={onInput1} />
      <Input value={formData.input2} onInput={onInput2} />

      <button onClick={() => setFormData({...formData, input1: new Date().toISOString()})}>set input 1 hour</button>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <FocusInputChallenge value={focusInputChallengeValue} isFocused={isFocus} />
      <button onClick={() => setIsFocus(true)}>focus input</button>
    </div>
  )
}
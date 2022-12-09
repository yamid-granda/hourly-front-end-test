import classNames from "classnames"
import { useEffect, useRef, forwardRef, useImperativeHandle, useMemo, useState } from "react"
import './Input.scss'

const Input = forwardRef(({
  value = '',
  type = 'text',
  onInput,
  onFocus,
  onBlur,
  onClick,
  onKeyPress,
  onKeyDown,
  placeholder,
  children,
}, ref) => {
  const inputRef = useRef()

  const [isFocus, setIsFocus] = useState(false);

  useImperativeHandle(ref, () => ({
    getInputRef: () => inputRef
  }))

  const classes = useMemo(() => {
    return classNames({
      'ss-input': true,
      'ss-input--append': children?.append,
      'ss-input--focus': isFocus,
    })
  }, [isFocus])

  useEffect(() => {inputRef.current.value = value}, [value]);

  function onInputInput(event) {
    onInput && onInput(event)
  }

  function onInputFocus(event) {
    setIsFocus(true)
    onFocus && onFocus(event)
  }

  function onInputBlur(event) {
    setIsFocus(false)
    onBlur && onBlur(event)
  }

  function onInputClick(event) {
    onClick && onClick(event)
  }

  function onInputKeyPress(event) {
    onKeyPress && onKeyPress(event)
  }

  function onInputKeyDown(event) {
    onKeyDown && onKeyDown(event)
  }

  return (
    <div className={classes}>
      <input
        className="ss-input__input"
        ref={inputRef}
        type={type}
        onInput={onInputInput}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onClick={onInputClick}
        onKeyPress={onInputKeyPress}
        onKeyDown={onInputKeyDown}
        placeholder={placeholder}
      />

      <div className="ss-input__input-append">
        {children?.append}
      </div>
    </div>
  )
})

export default Input
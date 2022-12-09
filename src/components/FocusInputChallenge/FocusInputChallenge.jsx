import { useEffect, useRef } from "react"

export default function FocusInputChallenge({
  value,
  onInput,
  isFocused,
}) {
  const isMounted = useRef(false);
  const inputRef = useRef()

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    inputRef.current.value = value
  }, [value]);

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus()
    }
  }, [isFocused]);

  function onInputInput(event) {
    onInput && onInput(event.target.value)
  }

  return (
    <div className="ss-input">
      <input
        ref={inputRef}
        type="text"
        onInput={onInputInput}
      />
    </div>
  )
}
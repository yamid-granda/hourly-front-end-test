import { useEffect, useMemo, useRef, useState } from 'react'
import './SingleSelect.scss'
import classNames from 'classnames'
import Input from '../Input/Input'
import Portal from '../Portal/Portal'
import { useMutationObservable } from '../../hooks/useMutationObservable'
import caretDownIcon from '../../assets/caret-down-icon.svg'

export default function SingleSelect({
  value = null,
  options = [],
  name,
  onChange,
  placeholder,
  testId = 'single-select',
}) {
  // data

  const [searchText, setSearchText] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [clientRect, setClientRect] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isMouseInOptions, setIsMouseInOptions] = useState(false)
  const [focusOptionIndex, setFocusOptionIndex] = useState(0)

  // refs

  const singleSelectRef = useRef()
  const searchRef = useRef()
  const radioRef = useRef()

  // computed

  const filteredOptions = useMemo(() => {
    if (!isSearching)
      return options

    return options.filter(option => option.text.toLowerCase().includes(searchText.toLocaleLowerCase()))
  }, [options, searchText, isSearching])

  const optionsPositions = useMemo(() => {
    const { x, y, width, height } = clientRect
    const top = y + height
    const left = x

    return {
      x: `${x}px`,
      y: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    }
  }, [clientRect])

  const optionsClasses = useMemo(() => {
    return classNames({
      'ss-single-select__options-container': true,
      'ss-single-select__options-container--hidden': !isOpen,
    })
  }, [isOpen])

  const optionsDic = useMemo(() => {
    return options.reduce((dic, { value, text }) => {
      const newDic = dic
      const existKey = Boolean(newDic[value])

      if (existKey)
        return newDic

      newDic[value] = { text }
      return newDic
    }, {})
  }, [options])

  // watch

  useEffect(() => {
    const searchTextToSet = optionsDic[value]?.text || ''
    setSearchText(searchTextToSet)
  }, [value])

  // events

  function onSearchClick() {
    open()
  }

  function onSearchInput(event) {
    setIsSearching(true)
    setSearchText(event.target.value)
  }

  function onSearchFocus() {
    open()
  }

  function onSearchBlur() {
    if (isMouseInOptions)
      return

    close()
  }

  function onSearchKeyDown(event) {
    const { key } = event

    const eventsDic = {
      Enter: onEnterKeyPress,
      Escape: onEscapeKeyPress,
      ArrowDown: onArrowDownKeyPress,
      ArrowUp: onArrowUpKeyPress,
      Tab: close,
    }

    const keyEvent = eventsDic[key]

    if (!keyEvent)
      return

    keyEvent(event)
  }

  function onEnterKeyPress(event) {
    if (isOpen) {
      event.preventDefault()
      const focusOption = options[focusOptionIndex]
      setOption(focusOption)
    }
  }

  function onEscapeKeyPress() {
    close()
  }

  function onArrowDownKeyPress() {
    if (isOpen) {
      increaseOptionFocusIndex()
      return
    }

    open()
  }

  function onArrowUpKeyPress() {
    if (isOpen)
      decreaseOptionFocusIndex()
  }

  function onOptionsMouseEnter() {
    setIsMouseInOptions(true)
  }

  function onOptionsMouseLeave() {
    setIsMouseInOptions(false)
  }

  function onOptionChange(option, index) {
    setFocusOptionIndex(index)
    setOption(option)
  }

  function onScroll() {
    calculateClientRect()
  }

  function onClickOutside() {
    close()
  }

  // methods

  function calculateClientRect() {
    setClientRect(singleSelectRef?.current?.getBoundingClientRect())
  }

  function setOption(option) {
    setIsSearching(false)
    setSearchText(option.text)
    searchRef.current.getInputRef().current.focus()
    close()
    setValue(option.value)
  }

  function setValue(value) {
    onChange && onChange(value)
  }

  function open() {
    calculateClientRect()
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function handleClickOutside(event) {
    if (singleSelectRef.current && !singleSelectRef.current.contains(event.target))
      onClickOutside()
  }

  function increaseOptionFocusIndex() {
    if (focusOptionIndex < options.length - 1)
      setFocusOptionIndex(focusOptionIndex + 1)
  }

  function decreaseOptionFocusIndex() {
    if (focusOptionIndex > 0)
      setFocusOptionIndex(focusOptionIndex - 1)
  }

  function getOptionClasses(option, index) {
    return classNames({
      'ss-single-select__option': true,
      'ss-single-select__option--focus': index === focusOptionIndex,
      'ss-single-select__option--active': option.value === value,
    })
  }

  // life cycle

  useEffect(() => {
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', handleClickOutside, true)

    calculateClientRect()

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  // hooks

  useMutationObservable(document, calculateClientRect)

  // templates

  const optionsTemplate = () => filteredOptions.map((option, index) => (
    <label
      key={`${option.value}${index}`}
      className={getOptionClasses(option, index)}
      data-testid={`label-${option.value}`}
      htmlFor={`${name}-${option.value}`}
    >
      <span className="ss-single-select__option-text">
        { option.text }
      </span>

      <input
        ref={radioRef}
        id={`${name}-${option.value}`}
        name={name}
        value={option.value}
        type="radio"
        className="ss-single-select__option-input"
        data-testid={`option-${option.value}`}
        onInput={() => onOptionChange(option, index)}
      />
    </label>
  ))

  return (
    <div
      ref={singleSelectRef}
      className="ss-single-select"
      data-testid={testId}
    >
      {/* Search */}
      <div className="ss-single-select__search">
        <Input
          ref={searchRef}
          value={searchText}
          onInput={onSearchInput}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          onClick={onSearchClick}
          onKeyDown={onSearchKeyDown}
          placeholder={placeholder}
          testId="search"
        >
          {{
            append: (
              <div className="ss-single-select__search-icon">
                <div className="ss-single-select__search-icon-wrap">
                  <img src={caretDownIcon} />
                </div>
              </div>
            ),
          }}
        </Input>
      </div>

      {/* Options */}
      <Portal>
        <div
          className={optionsClasses}
          style={{
            top: optionsPositions.top,
            left: optionsPositions.left,
            width: optionsPositions.width,
          }}
          data-testid={`${testId}-options`}
          onMouseEnter={onOptionsMouseEnter}
          onMouseLeave={onOptionsMouseLeave}
        >
          <div className="ss-single-select__options">
            {optionsTemplate()}
          </div>
        </div>
      </Portal>
    </div>
  )
}

import { useEffect, useState } from 'react'

const DEFAULT_OPTIONS = {
  config: { childList: true, subtree: true },
}
export function useMutationObservable(targetEl, cb, options = DEFAULT_OPTIONS) {
  const [observer, setObserver] = useState(null)

  useEffect(() => {
    const obs = new MutationObserver(cb)
    setObserver(obs)
  }, [options, setObserver])

  useEffect(() => {
    if (!observer)
      return

    const { config } = options
    observer.observe(targetEl, config)

    return () => {
      if (observer)
        observer.disconnect()
    }
  }, [observer, targetEl, options])
}

export function formatNumber(number) {
  const numberFormatConfig = { useGrouping: false }
  return new Intl.NumberFormat('en-US', numberFormatConfig).format(number)
}

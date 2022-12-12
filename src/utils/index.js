export function formatNumber(number) {
  const numberFormatConfig = {
    useGrouping: false,
    maximumFractionDigits: 2,
  }
  return new Intl.NumberFormat('en-US', numberFormatConfig).format(number)
}

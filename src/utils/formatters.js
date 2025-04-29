export function formatValue(value, isPercent = false) {
    if (value === null || value === undefined) return "--"
    return isPercent ? `${value.toFixed(2)}%` : value.toFixed(2)
  }
  
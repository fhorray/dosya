export const getExtension = (value: string | File) => {
  if (typeof value === 'string') {
    return value.includes('.')
      ? value.substring(value.lastIndexOf('.'))
      : '';
  }

  return value.name.includes('.')
    ? value.name.substring(value.name.lastIndexOf('.'))
    : '';
}
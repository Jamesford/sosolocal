import { program } from 'commander'

export function parsePort(value) {
  const parsed = parseInt(value, 10)
  if (isNaN(parsed)) {
    throw new program.InvalidArgumentError(`Not a number.`)
  }
  return parsed
}


export const passwordValidators = [passwordValidator]
export const emailValidators = [emailValidator]
export const nameValidators = [nameValidator]

export function emptyValidator(input) {
  if (!input) {
    return "Input cannot be empty"
  }
}

export function passwordValidator(input) {
  if (input.length < 8) {
    return "Password must be 8 symbols or more"
  }
}

export function emailValidator(input) {
  const email = String(input)
  const regex_email_validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email.match(regex_email_validation)) {
    return "Plese enter valid email"
  }
}

export function nameValidator(input) {
  if (input.trim().length < 4) {
    return "Name must be 4 sign or more"
  } else if (input.trim().length > 15) {
    return "Name must be less than 15 signs"
  }
}

export function createSamePasswordValidator(first_password) {
  return (password) => {
    if (password != first_password)
      return "Passwords are different"
  }
}

export function createMaxLengthValidator(length) {
  return (input) => {
    if (!input.trim())
      return 'Text must contain other symbols except whitespaces'
    if (input.length > length)
      return `Text must be no more than ${length} characters`
  }
}

export function positiveNumberValidator(input) {
  if (!input.length)
    return
  const trimmed = input.trim()
  const num = Number(trimmed)
  if (!num) {
    return "only numbers"
  }
  if (num < 0) {
    return "positive numbers"
  }
}
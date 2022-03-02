module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Component name ?',
    validate (value) {
      if (!value.length) {
        return 'Components must have a name.'
      }
      return true
    }
  }
]

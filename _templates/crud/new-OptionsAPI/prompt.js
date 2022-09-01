module.exports = [
  {
    type: 'input',
    name: 'name',
    message: '❓views name?(Generate CRUD using Options API)',
    validate (value) {
      if (!value.length) {
        return 'View components must have a name.'
      }
      return true
    }
  }
]

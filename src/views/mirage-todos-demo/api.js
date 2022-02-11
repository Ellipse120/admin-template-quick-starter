import request from '@/utils/request'

const todos = () => {
  return request({
    url: '/todos',
    method: 'get'
  })
}

const addTodo = (data) => {
  return request({
    url: '/todos',
    method: 'post',
    data
  })
}

const deleteTodo = (id) => {
  return request({
    url: `/todos/${id}`,
    method: 'delete'
  })
}

export {
  todos,
  addTodo,
  deleteTodo
}

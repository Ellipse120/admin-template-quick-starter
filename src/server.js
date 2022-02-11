import { createServer } from 'miragejs'

const customResponseCode = {
  success: '200'
}

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
    logging: false,
    environment,
    seeds (server) {
      server.db.loadData({
        todos: [
          { text: 'Buy groceries', isDone: false },
          { text: 'Walk the dog', isDone: true },
          { text: 'Do laundry', isDone: false }
        ],
        items: [
          {
            title: 'test',
            status: 'published',
            author: 'admin',
            display_time: new Date(),
            pageviews: 1234
          },
          {
            title: 'test',
            status: 'draft',
            author: 'admin',
            display_time: new Date(),
            pageviews: 12
          },
          {
            title: 'hello',
            status: 'deleted',
            author: 'admin',
            display_time: new Date(),
            pageviews: 12
          }
        ]
      })
    },
    routes () {
      this.namespace = 'mock-api'
      // this.timing = 750

      this.get('/todos', ({ db }) => {
        return {
          code: customResponseCode.success,
          data: db.todos
        }
      })

      this.patch('/todos/:id', (schema, request) => {
        const todo = JSON.parse(request.requestBody)
        return schema.db.todos.update(todo.id, todo)
      })

      this.post('/todos', (schema, request) => {
        const todo = JSON.parse(request.requestBody)
        return {
          code: customResponseCode.success,
          data: schema.db.todos.insert(todo)
        }
      })

      this.delete('/todos/:id', (schema, request) => {
        return {
          code: customResponseCode.success,
          data: schema.db.todos.remove(request.params.id)
        }
      })

      this.post('/user/login', (schema, request) => {
        const data = JSON.parse(request.requestBody)
        return {
          code: customResponseCode.success,
          data: {
            username: data.username,
            token: '11111'
          }
        }
      })

      this.get('/user/info', (schema, request) => {
        // const data = request.requestHeaders.Authorization
        return {
          code: customResponseCode.success,
          data: {
            name: '测试用户1',
            userName: '测试用户1',
            roleList: ['admin'],
            departmentId: 1,
            departmentName: '安监室',
            jgcj: 3
          }
        }
      })

      this.get('/table/list', ({ db }) => {
        return {
          code: customResponseCode.success,
          data: {
            total: db.items.length,
            items: db.items
          }
        }
      })
    }
  })

  server.passthrough(`${process.env.VUE_APP_LOCAL_BASE_API}/**`)
  server.passthrough(`${process.env.VUE_APP_JIAQIAN_LS_BASE_API}/**`)
  server.passthrough(`${process.env.VUE_APP_REMOTE_BASE_API}/**`)
  server.passthrough(`${window.localStorage.getItem('API_URL')}/**`)
  server.logging = false

  window.server = server
  return server
}

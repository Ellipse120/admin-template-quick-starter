import { createServer } from 'miragejs'

const customResponseCode = {
  success: '200'
}

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
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
            id: 1,
            title: 'test',
            status: 'published',
            author: 'admin1',
            display_time: new Date(),
            pageviews: 1234
          },
          {
            id: 2,
            title: 'test',
            status: 'draft',
            author: 'admin2',
            display_time: new Date(),
            pageviews: 12
          },
          {
            id: 3,
            title: 'hello',
            status: 'deleted',
            author: 'admin3',
            display_time: new Date(),
            pageviews: 12
          }
        ]
      })
    },
    routes () {
      this.namespace = 'mock-api'
      this.timing = 100

      // region Todos
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
      // endregion

      // region Users
      this.get('/users', ({ db }, request) => {
        const { title, status } = request.queryParams
        const filteredResult = db.items.filter((item) => {
          return item.title.includes(title) || item.status.includes(status)
        })

        return {
          code: customResponseCode.success,
          data: {
            list: filteredResult.length ? filteredResult : db.items,
            pageReq: {
              doCount: true,
              offset: 0,
              pageNo: 1,
              pageSize: 20,
              totalRecords: db.items.length
            }
          }
        }
      })

      this.get('/users/:id', (schema, request) => {
        const id = request.params.id
        return {
          code: customResponseCode.success,
          data: schema.db.items.find(id)
        }
      })

      this.put('/users/:id', (schema, request) => {
        const user = JSON.parse(request.requestBody)

        return {
          code: customResponseCode.success,
          data: schema.db.items.update(user.id, user)
        }
      })

      this.post('/users', (schema, request) => {
        const user = JSON.parse(request.requestBody)
        return {
          code: customResponseCode.success,
          data: schema.db.items.insert(user)
        }
      })

      this.delete('/users/:id', (schema, request) => {
        return {
          code: customResponseCode.success,
          data: schema.db.items.remove(request.params.id)
        }
      })
      // endregion

      this.post('/syst/user/login', (schema, request) => {
        const data = JSON.parse(request.requestBody)
        return {
          code: customResponseCode.success,
          data: {
            username: data.username,
            token: '11111'
          }
        }
      })

      this.get('/syst/user/current', (schema, request) => {
        // const data = request.requestHeaders.Authorization
        return {
          code: customResponseCode.success,
          data: {
            name: '模拟用户',
            userName: '模拟用户',
            loginName: '模拟用户',
            roleList: [{ roleName: 'admin' }],
            menuList: [],
            departmentId: 1,
            departmentName: '模拟部门'
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
  // server.logging = false

  window.server = server
  return server
}

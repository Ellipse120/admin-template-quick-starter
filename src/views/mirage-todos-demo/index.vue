<template>
  <div>
    <el-card class="flex flex-col items-center justify-center mb-2">
      <div slot="header" class="text-center">
        <div class="text-3xl mb-4">MirageJS Todos</div>
        <el-input v-model="newTodo" placeholder="请输入内容">
          <template slot="append">
            <el-button @click="doAdd">添加</el-button>
          </template>
        </el-input>
      </div>
      <div v-loading="isLoading">
        <el-checkbox-group v-model="doneList" @change="handleCheckedChange">
          <el-checkbox v-for="item in list" :key="item.id" :checked="item.isDone" :label="item.id" class="flex items-center">
            <div>
              <span class="text-purple-500 bg-white hover:bg-black hover:text-white transition">{{ item.text }}</span> <el-button type="text" icon="el-icon-delete" class="ml-6" @click="doDelete(item)">Remove</el-button>
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>

    <el-card class="mb-2">
      <div slot="header" class="text-center">
        CryptoJS
      </div>

      <div class="flex items-center justify-between">
        sourceStr: <el-input v-model="sourceStr" class="m-2" type="textarea" clearable />
        secret: <el-input v-model="secret" class="m-2" type="textarea" clearable />
      </div>

      <div class="grid grid-cols-2 gap-4 bg-red-100 rounded p-4  antialiased break-words">
        <div>
          Encrypted: <p class="bg-red-500 text-white p-2 rounded">{{ targetStr }}</p>
        </div>
        <div>
          Source: <div class="bg-red-500 text-white p-2 rounded">{{ deTargetStr }}</div>
        </div>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="text-center text-green-500">
        JSX Example
      </div>

      <j-s-x />
    </el-card>
  </div>
</template>

<script>
import cryptoJS from 'crypto-js'
import { todos, addTodo, deleteTodo } from './api'
import JSX from './JSX'

export default {
  name: 'MirageTodos',
  components: { JSX },
  directives: {
    'max-length': {
      update: function (el, binding) {
        const max_chars = binding.expression
        const handlerInput = (e) => {
          if ((e.target.value + '').length > max_chars) {
            e.target.value = (e.target.value + '').substr(0, max_chars)
            e.target.dispatchEvent(new CustomEvent('input'))
          }
        }

        el.addEventListener('input', handlerInput)
      }
    }
  },
  data () {
    return {
      isLoading: false,
      list: [],
      doneList: [],
      newTodo: null,
      sourceStr: 'hello',
      secret: 'secret',
      testNum: 0
    }
  },
  computed: {
    targetStr () {
      return cryptoJS.AES.encrypt(this.sourceStr, this.secret)
    },
    deTargetStr () {
      return cryptoJS.AES.decrypt(this.targetStr, this.secret).toString(cryptoJS.enc.Utf8)
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.isLoading = true
      const { data } = await todos().finally(() => {
        this.isLoading = false
      })
      this.list = data
    },

    async doAdd () {
      await addTodo({
        text: this.newTodo,
        isDone: false
      })
      await this.getList()
    },

    async doDelete ({ id }) {
      await deleteTodo(id)
      await this.getList()
    },

    handleCheckedChange (v) {
      this.doneList = v
    }
  }
}
</script>

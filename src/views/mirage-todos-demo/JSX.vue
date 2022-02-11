<script>
import random from 'lodash/random'

export default {
  name: 'JSX',
  data () {
    return {
      list: [1, 2],
      model: {
        text: '',
        selectedVal: ''
      }
    }
  },
  methods: {
    add () {
      this.list.push(random(1, 10000))
    },
    delete (index) {
      this.list.splice(index, 1)
    }
  },
  render () {
    return (
      <div class='flex items-center justify-center flex-col p-4'>
        <div class='whitespace-pre-wrap'>{JSON.stringify(this.model, null, 2)}</div>
        <div class='w-1/3 flex'>
          <el-input vModel={this.model.text} />
          <el-select vModel={this.model.selectedVal} clearable filterable>
            {
              this.list.map((item) => {
                return <el-option value={item} label={item} />
              })
            }
          </el-select>
        </div>
        <el-button type='success' vOn:click={this.add}>Add</el-button>
        <ul class='w-1/2 text-center'>
          {
            this.list.map((item, index) => {
              return <li class='flex'>
                <div class='text-red-500 p-2 w-3/5'>{item} 🎉🎉🎉</div>
                <el-button class='w-2/5' vOn:click={() => this.delete(index)}>Del</el-button>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}
</script>

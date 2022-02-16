<script>
import random from 'lodash/random'

export default {
  name: 'JSX',
  data () {
    return {
      options: ['option 1', 'option 2'],
      list: [],
      model: {
        text: '',
        selectedVal: ''
      }
    }
  },
  methods: {
    add () {
      this.list.push({
        id: random(1000, 9999),
        text: this.model.text,
        selectedVal: this.model.selectedVal
      })
    },
    delete (index) {
      this.list.splice(index, 1)
    }
  },
  render () {
    const noData = <el-empty />
    const listContent = this.list.map((item, index) => {
      return <li>
        <div class='flex flex-row justify-around items-center border-2 my-2 divide-x divide-red-500 divide-x-4 hover:bg-gray-100'>
          <div class='text-red-500 p-2 w-4/5'>{item.id} - {item.text} - {item.selectedVal} 🎉🎉🎉</div>
          <div class='w-1/5 text-center cursor-pointer text-red-500 hover:text-purple-500 transition-all duration-2000' vOn:click={() => this.delete(index)}>Del</div>
        </div>
      </li>
    })
    const l = this.list.length ? listContent : noData

    return (
      <div class='flex items-center justify-center flex-col p-4'>
        <div class='flex justify-between'>
          <el-input vModel={this.model.text} />
          <el-select class='mx-4' vModel={this.model.selectedVal} clearable filterable>
            {
              this.options.map((item) => {
                return <el-option value={item} label={item} />
              })
            }
          </el-select>
          <el-button type='success' vOn:click={this.add}>Add</el-button>
        </div>

        <ul class='text-center w-1/2 my-4'>
          {l}
        </ul>
      </div>
    )
  }
}
</script>

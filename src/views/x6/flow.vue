<template>
  <div class="mx-4 h-full p-2">
    <details>
      <summary>
        <el-button-wrapper class="mb-2" type="success" @click="getGraphData">获取数据</el-button-wrapper>
      </summary>
      <pre class="max-h-80 overflow-auto border-2 rounded-xl p-2 select-all">{{ flowData }}</pre>
    </details>

    <div id="container" class="inline-flex border-2 border-red-100 h-container relative w-container">
      <div id="stencil" class="w-1/5 relative" />
      <div id="graph-container" class="w-4/5 h-container" />
      <div id="minimap" class="absolute bottom-3 right-2" />
    </div>
    <div id="settings" class="h-container border-2 w-200px inline-block align-top p-2">
      <el-tabs>
        <el-tab-pane label="样式">
          <div>字体大小：</div>
          <el-input v-model="model.fontSize" clearable />
          <div class="mt-1">字体颜色：</div>
          <el-color-picker v-model="model.color" clearable />
          <div class="mt-1">背景色：</div>
          <el-color-picker v-model="model.fill" clearable />
          <div class="mt-1">边框颜色：</div>
          <el-color-picker v-model="model.stroke" clearable />
          <div class="mt-1">边框大小：</div>
          <el-input v-model="model.strokeWidth" clearable />
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api'
import { Graph, Shape, Addon } from '@antv/x6'
import '@antv/x6-vue-shape'
import initData from './initData.json'
import ElButtonWrapper from '@/components/ElButtonWrapper'
import Check from './check'

import './shapes'

export default {
  name: 'FlowChart',
  components: { ElButtonWrapper },
  setup () {
    const graphRef = ref(null)
    let graph
    const flowData = ref(null)

    const model = ref({
      fill: '#EFF4FF',
      stroke: '#5F95FF',
      strokeWidth: 1,
      fontSize: 12,
      color: '#262626'
    })

    let checkedNode = ref(null)

    watch(model.value, (newVal) => {
      checkedNode.setAttrs(({
        body: {
          fill: newVal.fill,
          stroke: newVal.stroke,
          strokeWidth: newVal.strokeWidth
        },
        text: {
          fontSize: newVal.fontSize,
          fill: newVal.color
        }
      }))
    })

    const initGraph = () => {
      graph = new Graph({
        container: document.getElementById('graph-container'),
        grid: true,
        autoResize: true,
        history: true,
        // panning: true,
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.5,
          maxScale: 3
        },
        connecting: {
          router: 'manhattan',
          connector: {
            name: 'jumpover'
          },
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          snap: {
            radius: 20
          },
          createEdge () {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8
                  }
                }
              },
              zIndex: 0
            })
          },
          validateConnection ({ targetMagnet }) {
            return !!targetMagnet
          }
        },
        highlighting: {
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#5F95FF',
                stroke: '#5F95FF'
              }
            }
          }
        },
        resizing: true,
        rotating: true,
        selecting: {
          enabled: true,
          rubberband: true,
          showNodeSelectionBox: true
        },
        snapline: true,
        keyboard: true,
        clipboard: true,
        scroller: {
          enabled: true,
          className: 'flex-auto'
        },
        interacting: true,
        minimap: {
          enabled: true,
          container: document.getElementById('minimap')
        }
      })
      // #endregion

      // #region 初始化 stencil
      const stencil = new Addon.Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 300,
        stencilGraphHeight: 180,
        collapsable: true,
        groups: [
          {
            title: '基础流程图',
            name: 'group1',
            graphHeight: 250
          },
          {
            title: '系统设计图',
            name: 'group2',
            graphHeight: 250,
            layoutOptions: {
              rowHeight: 70
            }
          }
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 80,
          rowHeight: 55
        }
      })

      document.getElementById('stencil')?.appendChild(stencil.container)
      // #endregion

      // #region 快捷键与事件

      // copy cut paste
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        return false
      })

      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.cut(cells)
        }
        return false
      })

      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        return false
      })

      // undo redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.history.canUndo()) {
          graph.history.undo()
        }
        return false
      })

      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.history.canRedo()) {
          graph.history.redo()
        }
        return false
      })

      // select all
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
          graph.select(nodes)
        }
      })

      // delete
      // graph.bindKey('backspace', () => {
      //   const cells = graph.getSelectedCells()
      //   if (cells.length) {
      //     graph.removeCells(cells)
      //   }
      // })

      // zoom
      graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
          graph.zoom(0.1)
        }
      })

      graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
          graph.zoom(-0.1)
        }
      })

      // 控制连接桩显示/隐藏
      const showPorts = (ports, show) => {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }

      graph.on('node:mouseenter', () => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, true)
      })

      graph.on('node:mouseleave', () => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, false)
      })

      // db-click to edit cell
      graph.on('cell:dblclick', ({ cell, e }) => {
        cell.addTools([
          {
            name: cell.isEdge() ? 'edge-editor' : 'node-editor',
            args: {
              event: e
            }
          }
        ])
      })

      graph.on('cell:mouseenter', ({ cell }) => {
        if (cell.isEdge()) {
          cell.addTools([
            {
              name: 'button-remove',
              args: {
                distance: 20
              }
            },
            {
              name: 'button',
              args: {
                markup: [
                  {
                    tagName: 'circle',
                    selector: 'button',
                    attrs: {
                      r: 7,
                      stroke: '#fe854f',
                      strokeWidth: 2,
                      fill: 'white',
                      cursor: 'pointer'
                    }
                  },
                  {
                    tagName: 'text',
                    textContent: 'x',
                    selector: 'icon',
                    attrs: {
                      fill: '#fe854f',
                      fontSize: 10,
                      textAnchor: 'middle',
                      pointerEvents: 'none',
                      y: '0.2em'
                    }
                  }
                ],
                distance: -30,
                onClick ({ view }) {
                  const edge = view.cell
                  edge.attr({
                    line: {
                      targetMarker: {
                        tagName: 'path',
                        fill: 'none',
                        stroke: '#A2B1C3',
                        strokeWidth: 0
                      }
                    }
                  })
                }
              }
            },
            'vertices',
            'segments'
          ])
        } else {
          cell.addTools([
            {
              name: 'boundary',
              args: {
                fill: 'green',
                stroke: '#333',
                'stroke-width': 1,
                fillOpacity: 0.2
              }
            },
            {
              name: 'button-remove',
              args: {
                x: 0,
                y: 0,
                offset: { x: 10, y: 10 }
              }
            }
          ])
        }
      })

      graph.on('cell:mouseleave', ({ cell }) => {
        cell.removeTool('boundary')
        cell.removeTool('button')
        cell.removeTool('button-remove')
        cell.removeTool('source-arrowhead')
        cell.removeTool('target-arrowhead')
        cell.removeTool('vertices')
        cell.removeTool('segments')
      })

      graph.on('cell:click', ({ cell, e }) => {
        if (cell.isNode()) {
          checkedNode = cell
          const { body, text } = cell.getAttrs()
          model.value.fill = body?.fill
          model.value.stroke = body?.stroke
          model.value.strokeWidth = body?.strokeWidth
          model.value.fontSize = text?.fontSize
          model.value.color = text?.color
        }
      })
      // #endregion

      // #region 初始化图形
      const ports = {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          }
        },
        items: [
          {
            group: 'top'
          },
          {
            group: 'right'
          },
          {
            group: 'bottom'
          },
          {
            group: 'left'
          }
        ]
      }

      Graph.registerVueComponent(
        'check',
        {
          template: `<Check />`,
          components: {
            Check
          }
        },
        true
      )

      Graph.registerNode(
        'custom-vue',
        {
          inherit: 'vue-shape',
          component: 'check',
          width: 90,
          height: 50,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
              title: true
            },
            label: {
              textWrap: {
                width: -10,
                breakWord: true,
                ellipsis: true
              }
            },
            text: {
              fontSize: 12,
              color: '#262626',
              text: '开始'
            }
          },
          ports: { ...ports }
        },
        true
      )

      Graph.registerNode(
        'custom-rect',
        {
          inherit: 'rect',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
              title: true
            },
            label: {
              textWrap: {
                width: -10,
                breakWord: true,
                ellipsis: true
              }
            },
            text: {
              fontSize: 12,
              color: '#262626'
            }
          },
          ports: { ...ports }
        },
        true
      )

      Graph.registerNode(
        'custom-polygon',
        {
          inherit: 'polygon',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              color: '#262626'
            }
          },
          ports: {
            ...ports,
            items: [
              {
                group: 'top'
              },
              {
                group: 'bottom'
              }
            ]
          }
        },
        true
      )

      Graph.registerNode(
        'custom-circle',
        {
          inherit: 'circle',
          width: 45,
          height: 45,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              color: '#262626'
            }
          },
          ports: { ...ports }
        },
        true
      )

      Graph.registerNode(
        'custom-image',
        {
          inherit: 'rect',
          width: 52,
          height: 52,
          markup: [
            {
              tagName: 'rect',
              selector: 'body'
            },
            {
              tagName: 'image'
            },
            {
              tagName: 'text',
              selector: 'label'
            }
          ],
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#26C160',
              fill: '#26C160'
            },
            image: {
              width: 26,
              height: 26,
              refX: 13,
              refY: 16
            },
            label: {
              refX: 3,
              refY: 2,
              textAnchor: 'left',
              textVerticalAnchor: 'top',
              fontSize: 12,
              fill: '#fff'
            }
          },
          ports: { ...ports }
        },
        true
      )

      Graph.registerNode(
        'custom-path',
        {
          inherit: 'path',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              color: '#262626'
            }
          },
          ports: { ...ports }
        },
        true
      )

      const r1 = graph.createNode({
        shape: 'custom-rect',
        label: '开始',
        attrs: {
          body: {
            rx: 20,
            ry: 26
          }
        }
      })
      const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '过程'
      })
      const r3 = graph.createNode({
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: 6,
            ry: 6
          }
        },
        label: '可选过程'
      })
      const r4 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '0,10 10,0 20,10 10,20'
          }
        },
        label: '决策'
      })
      const r5 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '10,0 40,0 30,20 0,20'
          }
        },
        label: '数据'
      })
      const r6 = graph.createNode({
        shape: 'custom-circle',
        label: '连接'
      })

      const r8 = graph.createNode({
        shape: 'custom-vue',
        label: '开始'
      })

      stencil.load([r1, r2, r3, r4, r5, r6, r8], 'group1')

      const m1 = graph.createNode({
        shape: 'custom-image',
        label: 'Client',
        attrs: {
          body: {
            fill: 'rgba(59, 130, 246, 0.5)'
          },
          image: {
            'xlink:href': require('@/assets/train/train.png')
          }
        }
      })

      stencil.load([m1], 'group2')
      // #endregion

      graph.fromJSON(initData)
    }

    const getGraphData = () => {
      const d = graph.toJSON()
      console.log(d)
      flowData.value = d
    }

    onMounted(initGraph)

    return {
      graphRef,
      flowData,
      model,
      initGraph,
      getGraphData
    }
  }
}
</script>

<style>
/* 覆盖样式
#graph-container .x6-node text {*/
/*  @apply stroke-current text-green-500 text-3xl break-all inline-block;*/
/*}*/
</style>

<style scoped>
.h-container {
  height: calc(100% - 36px);
}

.w-container {
  width: calc(100% - 200px);
}
</style>

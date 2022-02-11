import { Shape } from '@antv/x6'

Shape.Path.define({
  title: '1',
  shape: 'flowchart_annotation_2',
  overwrite: true,
  width: 50,
  height: 100,
  attrs: {
    body: {
      fill: '#red',
      stroke: '#000',
      strokeWidth: 1,
      // refD: 'M 50 0 L 25 0 L 25 100 L 50 100 M 0 50 L 25 50'
      refD: 'M 255.88 7 L 248.88 10.5 L 250.63 7 L 248.88 3.5 Z'
    }
  }
})

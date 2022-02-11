import { parseTime, parseRelativeTime, formatText, toTree, downFileStream, genUUID, mapToKeyValueList } from '@/utils'

export const utilsMixin = {
  methods: {
    formatTimeMixin: parseTime,
    parseRelativeTimeMixin: parseRelativeTime,
    formatTextMixin: formatText,
    toTreeMixin: toTree,
    downFileStreamMixin: downFileStream,
    genUUIDMixin: genUUID,
    mapToKeyValueListMixin: mapToKeyValueList
  }
}

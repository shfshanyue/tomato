export const groupItems = state => {
  return state.items.reduce((groupItems, item) => {
    let date = item.start.toLocaleDateString()
    if (!groupItems.hasOwnProperty(date)) {
      groupItems[date] = {}
      groupItems[date].tomatos = []
      groupItems[date].time = item.start;
    }
    groupItems[date].tomatos.push(item)
    return groupItems
  }, {})
}

export const host = state => state.host
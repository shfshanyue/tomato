export const removeItem = ({dispatch}, item) => {
  dispatch('REMOVE', item)
}

export const addItem = ({dispatch}, item) => {
  console.log('add item', item)
  dispatch('ADD', item)
}

export const loadItems = ({dispatch}, items) => {
  items.forEach((item)=> {
    item.start = new Date(item.start.iso)
    item.end = new Date(item.end.iso)
  })
  dispatch('LOAD', items)
}

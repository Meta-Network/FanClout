/**
 * 处理DOM里面的 a tag，生成可以点击的链接
 * @param {*} dom 需要处理的DOM
 */
export const renderLinkUser = (dom) => {
  const div = document.createElement('div')
  div.innerHTML = dom

  const linkAll = div.querySelectorAll('a.tribute-mention')
  Array.prototype.slice.apply(linkAll).forEach(ele => {
    const userId = ele.getAttribute('data-user')
    if (userId) {
      ele.setAttribute('href', `/user/${userId}`)
      ele.setAttribute('target', '_blank')
    }

    const tagId = ele.getAttribute('data-tag')
    if (tagId) {
      const tagName = ele.innerText // #xxxx
      // console.log('tagName', tagName)
      ele.setAttribute('href', `/tags/${tagId}?name=${tagName.slice(1)}`)
      ele.setAttribute('target', '_blank')
    }

    if (!userId && !tagId) {
      ele.setAttribute('href', 'javascript:;')
    }
  })

  return (div.innerHTML).toString()
}

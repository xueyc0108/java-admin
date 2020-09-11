import request from '@/utils/request'

const api_name = '/cms/book'

export default {
  // ## 动态条件查询带分页
  findPageBook(pageNo, pageSize, bookQuery) {
    return request({
      url: `${api_name}/${pageNo}/${pageSize}`,
      method: 'post',
      data: bookQuery
    })
  },
  saveBook(book){
    return request({
      url:`${api_name}/saveBook`,
      method:'post',
      data:book
    })
  },
  getBookById(bookId){
    return request({
      url:`${api_name}/getBookById/${bookId}`,
      method:'get'
    })
  },
  updateBook(book){
    return request({
      url:`${api_name}/updateBook`,
      method:'post',
      data:book
    })
  },
  deleteById(bookId){
    return request({
      url:`${api_name}/deleteById/${bookId}`,
      method:'delete'
    })
  },
  upOrDownBook(bookId,status){
    return request({
      url:`${api_name}/${bookId}/${status}`,
      method:'put'
    })
  },
  queryByLevel(classification){
    return request({
      url:`${api_name}/queryByLevel`,
      method:'post',
      data:classification
    })
  },
  deleteFile(url){
    return request({
      url:`${api_name}/deleteFile`,
      method:'delete',
      data:url
    })
  }

}

import request from '@/utils/request'


const api_name = '/copyright/introduction/owner'

export default {
  findPageOwner(pageNo,pageSize,QueryOwner){
    return request({
      url:`${api_name}/${pageNo}/${pageSize}`,
      method:'post',
      data:QueryOwner
    })
  },
  saveOwner(owner){
    return request({
      url:`${api_name}/saveOwner`,
      method:'post',
      data:owner
    })
  },
  deleteById(ownerId){
    return request({
      url:`${api_name}/deleteById/${ownerId}`,
      method:'delete'
    })
  }

}

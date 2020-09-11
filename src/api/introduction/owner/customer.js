import request from '@/utils/request'


const api_name = '/copyright/introduction/ownerContact'

export default {
  findPageOwner(pageNo,pageSize,OwnerContactQuery){
    return request({
      url:`${api_name}/${pageNo}/${pageSize}`,
      method:'post',
      data:OwnerContactQuery
    })
  },
  deleteById(ownerContactId) {
    return request({
      url:`${api_name}/deleteById/${ownerContactId}`,
      method:'delete'
    })
  },
  updateOwnerContact(ownerContact){
    return request({
      url:`${api_name}/updateOwnerContact`,
      method:'post',
      data:ownerContact
    })
  },
  getOwnerContactById(OwnerContactId){
    return request({
      url:`${api_name}/getOwnerContactById/${OwnerContactId}`,
      method:'get'
    })
  },
  saveOwnerContact(ownerContact){
    return request({
      url:`${api_name}/saveOwnerContact`,
      method:'post',
      data:ownerContact
    })
  }

}

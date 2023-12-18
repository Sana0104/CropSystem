import http from './http-common'

class UserService{
    login(data){
        return http.post(`user/user_login`,data)
    }
    register(data){
        return http.post(`user/new`,data)
    }

   
}
export default new UserService();
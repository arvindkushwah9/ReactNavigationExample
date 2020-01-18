import * as globals from './globalPaths'
export default class Interceptor {
    static headers = {
        'client': this.client,
        'Content-Type': 'application/json',
        'token-type': this.tokenType,
        'access-token': this.accessToken,
        'expiry': this.expiry,
        'Origin': '',
        'uid': this.uid,
        'Accept': 'application/json',
        'User-Token': this.accessToken,
    }



    static stripe_headers = {
        'Authorization': 'Bearer ' + globals.stripe_secret,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': '',
    }

    static getHeadersForStripe() {
        return this.stripe_headers
    }

    static getHeaders() {
        return this.headers
    }

    static getHeadersUpload() {
        temp = this.headers;
        temp['Content-Type'] =  "multipart/form-data"
        return temp
    }


    static getFileUploadHeaders() {
        if (this.token != null) {
            var head = {
                Authorization: this.token
            }
            return head
        } else
            return null
    }

    static resetHeaders() {

        this.headers['access-token'] = null
        this.headers['client'] = null
        this.headers['token-type'] = null
        this.headers['expiry'] = null
        this.headers['uid'] = null
        this.headers['User-Token'] = null

    }

    static setHeaders(params) {

        this.headers['access-token'] = params['access-token']
        this.headers['client'] = params.client
        this.headers['token-type'] = params['token-type']
        this.headers['expiry'] = params.expiry
        this.headers['uid'] = params.uid
        this.headers['User-Token'] = params['access-token']


        // console.log(this.headers)
    }

}
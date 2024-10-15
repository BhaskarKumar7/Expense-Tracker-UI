import { UserAddress } from "./UserAddress"

export class RegistrationRequest {
    firstName : String = ''
    lastName : String = ''
    userName : String = ''
    password : String = ''
    email : String = ''
    mobileNo : String = ''
    dateOfBirth : String = ''
    gender : String = ''
    userAddress : UserAddress = new UserAddress();
}
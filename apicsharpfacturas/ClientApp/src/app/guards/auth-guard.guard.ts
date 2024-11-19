import { CanActivateFn } from '@angular/router';

 // hard code data for logged in user
 const loggedInUser = {
  name: "jhadmin",
  password: "123456Jh"
}

// guard
export const authGuardGuard: CanActivateFn = (route, state) => {

  const name = localStorage.getItem("name");
  const password = localStorage.getItem("password");
  // check if name and password are not null
  if(name != null && password != null) {
    // validate if name and password are equal to the store data
    if(name == loggedInUser.name && password == loggedInUser.password) {
      return true;
    }
    return false;
  }
  return false;

};

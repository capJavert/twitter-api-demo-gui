'use strict';
import {User} from "./user";
import {Session} from "./session";
import {RoleEnum} from "./role.enum";

const user =  new User();
user.session = new Session("Bearer 41872b21-08aa-4a0b-8623-dc1fac0e1fae", RoleEnum.Admin);

export const UserInstance = user;

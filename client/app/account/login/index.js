'use strict';

import LoginController from './login.controller';

export default angular.module('webcocinaApp.login', [])
  .controller('LoginController', LoginController)
  .name;

'use strict';

import routes from './admin.routes';
import AdminController from './admin.controller';

export default angular.module('webcocinaApp.admin', ['webcocinaApp.auth', 'ui.router'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;

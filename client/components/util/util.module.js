'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('webcocinaApp.util', [])
  .factory('Util', UtilService)
  .name;

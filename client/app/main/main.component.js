import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

import moment from '../../../bower_components/moment/moment';
import angularMoment from '../../../bower_components/angular-moment';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';
  newDateFrom = null;
  newDateTo = null;
  newMail = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.totalDays = 0;
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  calcTotalDays(){
    /*
    var from = moment(this.newDateFrom);
    var to = moment(this.newDateTo);
    this.totalDays = from.diff(to, 'days'); //Here we calculate the total dates with momentjs
    */

    //Calculate the diff without momentjs
    var oneDay = 24*60*60*1000;
    var firstDate = new Date(this.newDateFrom);
    var secondDate = new Date(this.newDateTo);
    if (this.newDateFrom && this.newDateTo){
      this.totalDays = (secondDate.getTime() - firstDate.getTime())/(oneDay);
    }

    return this.totalDays && this.totalDays > 0 ? this.totalDays : 0;
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing,
        dateFrom: this.newDateFrom,
        dateTo: this.newDateTo,
        totalDays: this.totalDays,
        mail: this.newMail
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

export default angular.module('webcocinaApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;

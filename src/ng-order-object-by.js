'use strict';

(
  function(angular) {
    return angular
      .module('ngOrderObjectBy', [])
      .filter('orderObjectBy', function() {
        return function (items, fields) {

          if(!Array.isArray(fields))
          {
            fields = [fields];
          }
        
          function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }
          
          var filtered = [];

          angular.forEach(items, function(item, key) {
            item.key = key;
            filtered.push(item);
          });

          function index(obj, i) {
            return obj[i];
          }
          
          function compare(a, b, field)
          {
            var reverse = false;
            if(field.charAt(0) ==  "-")
            {
              field = field.substr(1);
              reverse = true;
            }
            
            var comparator;
            var reducedA = field.split('.').reduce(index, a);
            var reducedB = field.split('.').reduce(index, b);

            if (isNumeric(reducedA) && isNumeric(reducedB)) {
              reducedA = Number(reducedA);
              reducedB = Number(reducedB);
            }

            if (reducedA === reducedB) {
              comparator = 0;
            } else {
              if (reverse) {
                comparator = reducedA > reducedB ? -1 : 1;
              } else {
                comparator = reducedA > reducedB ? 1 : -1;
              }
            }

            return comparator;
          }

          filtered.sort(function(a, b)
          {
            var result = 0;
            for (var f in fields)
            {
              result = compare(a, b, fields[f]);
              if (result !== 0) break;
            }
            return result;
          });

          return filtered;
        };
      });
  }
)(angular);

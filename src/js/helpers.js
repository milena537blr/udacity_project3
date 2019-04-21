let helpers = (function() {
  return {
    checkIntersection: function(x1, x2, x3, x4) {
      return x3 > x1 ? x3 < x2 : x4 > x1;
    },
    
    generateNumbers: function(n) {
      return Math.floor(Math.random() * n) + 1;
    }
  };
})();
export default helpers;


/**
 * Simple table sort jQuery plugin.
 *
 * The table to sort has to have <th> elements. If you want a column to be
 * sortable you have to tag it with a class 'sortable'. It sorts alphabetically
 * by default but you can tag it additionally to perform specific sorting.
 *
 * The following tagging classes are currently supported:
 *
 *    'sortable-string' (default - can be omited)
 *    'sortable-number'
 *
 * Usage Example:
 *
 *    <table id='mytable'>
 *      <thead>
 *        <tr>
 *          <th class='sortable sortable-string'>Name</th>
 *          <th class='sortable sortable-number'>Number</th>
 *        </tr>
 *      </thead>
 *      <tbody>
 *        <tr><td>A Name</td><td>4</td></tr>
 *        <tr><td>B Name</td><td>2</td></tr>
 *      </tbody>
 *    </table>
 *
 *    <script>
 *      $('table#mytable').sortable();
 *    </script>
 *
 * You can have additional 'th' which if not tagged with 'sortable' will be ignored.
 *
 * @author Francisco J. Carriedo
 */
(function( $ ) {

  // Adding trim if not supported natively on browser (U know... IE)
  // See: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/Trim#Compatibility
  if(!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g,'');
    };
  }

  var sortStrClass = 'sortable-string';
  var sortNumClass = 'sortable-number';
  var sortDateClass = 'sortable-date'; // FIXME: Not supported.

  $.fn.sortable = function( options ) {
    var settings = {}; // No settings as of now.
    if(options) $.extend(settings, options);

    var $self = this;
    var $tbody = this.children('tbody');

    // Object that holds that asc true/false properties for every
    // sortable column.
    var ascColArr = {};

    /**
     * Clears the tbody and appends all the given elems.
     */
    function render(elems) {
      $tbody.html('');
      $.each(elems, function(i, elem) { $tbody.append(elem) });
    }

    /**
     * Sorts alphabetically
     */
    function alphaSort(elems, ix, asc) {
      return elems.sort(function(a, b) {
        var aStr = $(a).children('td:nth-child('+ix+')').text().trim().toLowerCase();
        var bStr = $(b).children('td:nth-child('+ix+')').text().trim().toLowerCase();
        return compare(aStr, bStr, asc);
      });
    }

    /**
     * Sorts numerically
     */
    function numSort(elems, ix, asc) {
      return elems.sort(function(a, b) {
        var aNum = parseInt( $(a).children('td:nth-child('+ix+')').text().trim() );
        var bNum = parseInt( $(b).children('td:nth-child('+ix+')').text().trim() );
        return compare(aNum, bNum, asc);
      });
    }

    function compare(a, b, asc) {
      var res = a > b ? -1 : 1;
      return (asc?-1:1)*res;
    }

    $(document).on('click', 'th.sortable', function(evt) {
      // Add 1 since it is 0 based index.
      var colIx = $(this).parent().children().index( $(this) ) + 1;
      if( $(this).hasClass(sortNumClass) ) {
        ascColArr[colIx] = !!!ascColArr[colIx];
        var elems = numSort( $self.find('tbody tr'), colIx, ascColArr[colIx]);
        render(elems);
      } else { // Defaults to string sorting.
        ascColArr[colIx] = !!!ascColArr[colIx];
        var elems = alphaSort( $self.find('tbody tr'), colIx, ascColArr[colIx]);
        render(elems);
      }
    });

    return this;
  };

})(jQuery);

jquery-simple-table-sort
========================

Very simple table sort jQuery plugin.

The table to sort has to have <th> elements. If you want a column to be
sortable you have to tag it with a class 'sortable'. It sorts alphabetically
by default but you can tag it additionally to perform specific sorting.

The following tagging classes are currently supported:

  * `'sortable-string'` (*default* - can be omited)
  * `'sortable-number'`

Usage Example:

```html
 <table id='mytable'>
   <thead>
     <tr>
       <th class='sortable sortable-string'>Name</th>
       <th class='sortable sortable-number'>Number</th>
     </tr>
   </thead>
   <tbody>
     <tr><td>A Name</td><td>4</td></tr>
     <tr><td>B Name</td><td>2</td></tr>
   </tbody>
 </table>

 <script>
   $('table#mytable').sortable();
 </script>
```

You can have additional 'th' which if not tagged with 'sortable' will be ignored.


/**

StickyTable props:
  columns: <array> (required if "colLayout" is undefined) (this prop will be ignored if "colLayout" is specified)
    ```jsx
    let columns = [
      {
        title: 'col title', // required
        field: 'colField1', // required
        minWidth: 123, // required (to calculate table scrollbar)

        // optional keys
        colCss: `color: red`, // this will be applied to all cells in column
        groupTitle: 'group col title', // required if "upperGroupTitle" is specified
        upperGroupTitle: 'upper group title',
      },
      // ...
    ];
    ```

    |       upperGroupTitle      |
    |  groupTitle   | groupTitle |
    | title | title |   title    |
    groupTitle and upperGroupTitle are additional table headers that can be added (maximum 3 rows of headers)
    if adjacent columns have the same groupTitle or upperGroupTitle (a === b),
      they will be automatically merged into 1 big TH cell with colSpan
    ```jsx
    let mergedGroupHeader = <span>Group Title</span>;
    let columns = [
      { groupTitle: mergedGroupHeader, title: 'title 1', minWidth: 123, field: 'col1' },
      { groupTitle: mergedGroupHeader, title: 'title 2', minWidth: 123, field: 'col2' },
      // ...
    ];
    ```

  colLayout: <array> (required if "columns" is undefined) (if this prop is specified, "columns" prop will be ignored)
    ```jsx
    let colLayout = [
      {
        type: 'static', // can be 'static' or 'scrollable'
        cols: [...staticColumns], // "cols" structure is the same as "columns"
      },
      {
        type: 'scrollable', // can be 'static' or 'scrollable'
        cols: [...scrollableColumns], // "cols" structure is the same as "columns"
      },
    ];
    ```

  rows: <array> (required)
    ```jsx
    let rows = [
      // cell value can be any JS expression
      { 'colField1': 'some value' }, 

      // cell value can be JSX node
      { 'colField1': <span style={{ color: 'red' }}>cell value can be a JSX node</span> }, 

      // cell value can be a plain JS object
      { 'colField1': {
        value: 'some value',
        props: {}, // will be passed to TableCell component
        ref: undefined, // optional
        component: TableCell, // default is Mui TableCell (optional)
      } }, 

      // cell value can be a render function if you want to customize the TableCell element
      // deprecated due to poor performance
      { 'colField1': ColCell => <ColCell title="Some title" tabindex="0">some value</ColCell> },

      // you can use _rowCss to style all cells in a row ("_rowCss" priority is higher than "colCss")
      { _rowCss: `color: blue`, ... },
      // ...
    ];
    ```

    adjacent cells in same column or same row with the same identity (a === b) will be automatically merged with rowSpan/colSpan set
      (only merge cells with type: Object, Function or ReactElement)
    ```jsx
    let mergeCell = (
      <span>This cell will automatically have rowSpan</span>
    );
    let rows = [
      { 'colField1': mergeCell, 'colField2': 'this cell will not merge' },
      { 'colField1': mergeCell, 'colField2': 'this cell will not merge' },
    ];
    ```

**/

export { default } from './StickyTable';

import React from 'react';
import PropTypes from 'prop-types';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableFooter from '@material-ui/core/TableFooter';
import MuiTablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

const defaultPaginationStyles = {
  root: {
    '&:last-child': {
      padding: '0px 24px 0px 24px',
    },
  },
  toolbar: {},
  selectRoot: {},
  '@media screen and (max-width: 400px)': {
    toolbar: {
      '& span:nth-child(2)': {
        display: 'none',
      },
    },
    selectRoot: {
      marginRight: '8px',
    },
  },
};

class TablePagination extends React.Component {
  static propTypes = {
    /** Total number of table rows */
    count: PropTypes.number.isRequired,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Current page index */
    page: PropTypes.number.isRequired,
    /** Total number allowed of rows per page */
    rowsPerPage: PropTypes.number.isRequired,
    /** Callback to trigger rows per page change */
    changeRowsPerPage: PropTypes.func.isRequired,
  };

  handleRowChange = event => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    const { options } = this.props;
    this.props.changePage(page);
  };

  render() {
    const { count, classes, options, rowsPerPage, page: _page } = this.props;
    const textLabels = options.textLabels.pagination;

    let page = _page;
    if (page !== 0 && page >= Math.ceil(count / rowsPerPage)) {
      page = 0;
    }

    return (
      <MuiTableFooter>
        <MuiTableRow>
          <MuiTablePagination
            className={classes.root}
            classes={{
              caption: classes.caption,
              toolbar: classes.toolbar,
              selectRoot: classes.selectRoot,
            }}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={textLabels.rowsPerPage}
            labelDisplayedRows={
              options.labelDisplayedRows
                ? ({ from, to, count }) => options.labelDisplayedRows({ from, to, count, page, rowsPerPage })
                : ({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`
            }
            backIconButtonProps={{
              id: 'pagination-back',
              'aria-label': textLabels.previous,
            }}
            nextIconButtonProps={{
              id: 'pagination-next',
              'aria-label': textLabels.next,
            }}
            SelectProps={{
              id: 'pagination-input',
              SelectDisplayProps: { id: 'pagination-rows' },
              MenuProps: {
                id: 'pagination-menu',
                MenuListProps: { id: 'pagination-menu-list' },
              },
            }}
            rowsPerPageOptions={options.rowsPerPageOptions}
            onChangePage={this.handlePageChange}
            onChangeRowsPerPage={this.handleRowChange}
            ActionsComponent={options.ActionsComponent}
          />
        </MuiTableRow>
      </MuiTableFooter>
    );
  }
}

export default withStyles(defaultPaginationStyles, { name: 'MUIDataTablePagination' })(TablePagination);

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';

const SVGSortIcon = props => {
  return (
    <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
      <path d="M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z"></path>
    </svg>
  );
};

const defaultHeadCellStyles = theme => ({
  root: {},
  fixedHeader: {
    position: 'sticky',
    top: '0px',
    left: '0px',
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
  },
  tooltip: {
    cursor: 'pointer',
  },
  mypopper: {
    '&[data-x-out-of-boundaries]': {
      display: 'none',
    },
  },
  data: {
    display: 'inline-block',
  },
  sortAction: {
    display: 'flex',
    verticalAlign: 'top',
    cursor: 'pointer',
    height: '10px',
  },
  sortActive: {
    color: theme.palette.text.primary,
  },
  toolButton: {
    display: 'flex',
    height: '10px',
    outline: 'none',
    cursor: 'pointer',
  },
  columnNoOrder: {
    display: 'flex',
    height: '10px',
    outline: 'none',
  },
});

class TableHeadCell extends React.Component {
  static propTypes = {
    /** Extend the style applied to components */
    classes: PropTypes.object,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Current sort direction */
    sortDirection: PropTypes.string,
    /** Callback to trigger column sort */
    toggleSort: PropTypes.func.isRequired,
    /** Sort enabled / disabled for this column **/
    sort: PropTypes.bool.isRequired,
    /** Hint tooltip text */
    hint: PropTypes.string,
    /** Column displayed in print */
    print: PropTypes.bool.isRequired,
  };

  state = {
    isSortTooltipOpen: false,
    isHintTooltipOpen: false,
  };

  handleSortClick = () => {
    this.props.toggleSort(this.props.index);
  };

  render() {
    const { isSortTooltipOpen, isHintTooltipOpen } = this.state;
    const { children, classes, options, align, sortDirection, sort, hint, print } = this.props;
    const sortActive = sortDirection !== null && sortDirection !== undefined ? true : false;

    const sortLabelProps = {
      active: sortActive,
      hideSortIcon: true,
      ...(sortDirection ? { direction: sortDirection } : {}),
    };

    const cellClass = classNames({
      [classes.root]: true,
      [classes.fixedHeader]: options.fixedHeader,
      'datatables-noprint': !print,
    });

    let headerAlign = align || 'flex-start';

    let flexDirection = align === 'right' ? 'row-reverse' : 'row';

    return (
      <TableCell className={cellClass} scope={'col'} sortDirection={sortDirection}>
        <React.Fragment>
          {options.sort && sort ? (
            <Tooltip
              title={options.textLabels.body.toolTip}
              placement={'bottom-start'}
              classes={{
                tooltip: classes.tooltip,
                popper: classes.mypopper,
              }}
              enterDelay={300}
              open={isSortTooltipOpen}
              onOpen={() =>
                isHintTooltipOpen
                  ? this.setState({ isSortTooltipOpen: false })
                  : this.setState({ isSortTooltipOpen: true })
              }
              onClose={() => this.setState({ isSortTooltipOpen: false })}>
              <span
                role="button"
                style={{ justifyContent: headerAlign, flexDirection: flexDirection, alignItems: 'center' }}
                onKeyUp={this.handleClickSort}
                onClick={this.handleSortClick}
                className={classes.toolButton}
                tabIndex={0}>
                <div
                  className={classNames({
                    [classes.data]: true,
                    [classes.sortActive]: sortActive,
                  })}>
                  {children}
                </div>
                <div className={classes.sortAction}>
                  {!sortActive && (
                    <span className={'MuiTableSortLabel-root MuiTableSortLabel-active'} style={{ paddingLeft: '4px' }}>
                      <SVGSortIcon />
                    </span>
                  )}
                  <TableSortLabel {...sortLabelProps} />
                  {hint && (
                    <Tooltip
                      title={hint}
                      placement={'bottom-end'}
                      classes={{
                        tooltip: classes.tooltip,
                      }}
                      enterDelay={300}
                      classes={{ popper: classes.mypopper }}
                      open={isHintTooltipOpen}
                      onOpen={() => this.setState({ isSortTooltipOpen: false, isHintTooltipOpen: true })}
                      onClose={() => this.setState({ isHintTooltipOpen: false })}>
                      <HelpIcon fontSize="small" />
                    </Tooltip>
                  )}
                </div>
              </span>
            </Tooltip>
          ) : (
            <span
              role="button"
              style={{ justifyContent: headerAlign, flexDirection: flexDirection, alignItems: 'center' }}
              className={classes.columnNoOrder}
              tabIndex={0}>
              <div
                className={classNames({
                  [classes.data]: true,
                  [classes.sortActive]: sortActive,
                })}>
                {children}
              </div>
            </span>
          )}
          {!options.sort ||
            (!sort && hint && (
              <Tooltip
                title={hint}
                placement={'bottom-end'}
                classes={{
                  tooltip: classes.tooltip,
                }}
                enterDelay={300}
                classes={{ popper: classes.mypopper }}>
                <HelpIcon fontSize="small" />
              </Tooltip>
            ))}
        </React.Fragment>
      </TableCell>
    );
  }
}

export default withStyles(defaultHeadCellStyles, { name: 'MUIDataTableHeadCell' })(TableHeadCell);

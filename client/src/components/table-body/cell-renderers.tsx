import React from 'react';
import { Star } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { TableCellProps, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import { MyTableCell, DifferCell } from './elements';

const renderers = {
  id: (cellMeasurerCache: CellMeasurerCache) => ({
    rowData: { isFavorite, b, q },
    parent,
    rowIndex,
    dataKey,
  }: TableCellProps) => {
    return (
      <CellMeasurer cache={cellMeasurerCache} parent={parent} rowIndex={rowIndex} key={dataKey}>
        <MyTableCell
          component="div"
          variant="body"
          style={{ height: cellMeasurerCache.rowHeight({ index: rowIndex }) }}
        >
          <IconButton edge="start">
            <Star color={isFavorite ? 'primary' : 'action'} />
          </IconButton>
          {`${b} / ${q}`}
        </MyTableCell>
      </CellMeasurer>
    );
  },
  lastPrice: (cellMeasurerCache: CellMeasurerCache) => ({
    rowData: { lastPrice },
    parent,
    rowIndex,
    dataKey,
  }: TableCellProps) => {
    return (
      <CellMeasurer cache={cellMeasurerCache} parent={parent} rowIndex={rowIndex} key={dataKey}>
        <MyTableCell
          component="div"
          variant="body"
          align="right"
          style={{ height: cellMeasurerCache.rowHeight({ index: rowIndex }) }}
        >
          {Math.round(lastPrice * 100000) / 100000}
        </MyTableCell>
      </CellMeasurer>
    );
  },
  change: (cellMeasurerCache: CellMeasurerCache) => ({
    rowData: { change },
    parent,
    rowIndex,
    dataKey,
  }: TableCellProps) => {
    const fixedChange = parseFloat((change as number).toFixed(2));
    return (
      <CellMeasurer cache={cellMeasurerCache} parent={parent} rowIndex={rowIndex} key={dataKey}>
        <DifferCell
          align="right"
          component="div"
          value={fixedChange}
          style={{ height: cellMeasurerCache.rowHeight({ index: rowIndex }) }}
        >
          {`${fixedChange > 0 ? '+' : ''}${fixedChange}%`}
        </DifferCell>
      </CellMeasurer>
    );
  },
  volume: (cellMeasurerCache: CellMeasurerCache) => ({
    rowData: { volume },
    parent,
    rowIndex,
    dataKey,
  }: TableCellProps) => {
    return (
      <CellMeasurer cache={cellMeasurerCache} parent={parent} rowIndex={rowIndex} key={dataKey}>
        <MyTableCell
          variant="body"
          component="div"
          align="right"
          style={{ height: cellMeasurerCache.rowHeight({ index: rowIndex }) }}
        >
          {volume}
        </MyTableCell>
      </CellMeasurer>
    );
  },
};

export default renderers;

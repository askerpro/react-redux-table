import React from 'react';
import { HeadCellRenderer, HeaderRowRenderer } from 'components/table-head';
import { RowRenderer, CellRenderers } from 'components/table-body';
import {
  Paper,
  TableContainer,
  CircularProgress,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Divider,
} from '@material-ui/core';
import { RadioButtonChecked } from '@material-ui/icons';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { enableMapSet } from 'immer';
import { getFilters, filterFunc, Filter } from 'utils/filter';
import { Order, stableSort, getSorting } from 'utils/sort';
import { Data } from 'models';
import TableToolbar from 'components/table-toolbar';
import { AutoSizer, Column, WindowScroller, Table, CellMeasurerCache } from 'react-virtualized';
import { getData, getRequestState, getSocketState } from './selectors';
import { fetch, changeIsFavorite, socketConnect, socketDisConnect } from './actions';
import store from './store';
import ThemeProvider from './theme';
import { LoadingScreenWrapper, SocketStatusWrapper } from './elements';

enableMapSet();

export type LastCellType = 'volume' | 'change';

export type OrderBy = keyof Omit<Data, 'isFavorite' | 'pn' | 'q' | 'b'>;

interface IColumn {
  id: OrderBy;
  label: string;
  numeric: boolean;
  width: number;
}

const columns: IColumn[] = [
  { id: 'id', numeric: false, label: 'Pair', width: 1800 },
  { id: 'lastPrice', numeric: true, label: 'Last Price', width: 1000 },
  {
    id: 'change',
    numeric: true,
    label: 'Change',
    width: 1080,
  },
  {
    id: 'volume',
    numeric: true,
    label: 'Volume',
    width: 1080,
  },
];

const App = () => {
  const dispatch = useDispatch();
  const data = Array.from(Object.values(useSelector(getData)));
  const requestState = useSelector(getRequestState);
  const socketState = useSelector(getSocketState);
  const markets = React.useRef<ReturnType<typeof getFilters>>(new Map());
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<OrderBy>('id');
  const [searchSymbols, setSearchSymbols] = React.useState('');
  const [filters, setFilters] = React.useState<Filter>({});
  const [lastCellType, setLastCellType] = React.useState<LastCellType>('change');
  const windowScrollerRef = React.useRef<WindowScroller>(null);
  const tableref = React.useRef<Table>(null);
  const cellMeasurerCache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 25,
    }),
  );
  const rows = stableSort(
    data.filter(filterFunc(filters, searchSymbols)),
    getSorting(order, orderBy),
  );
  React.useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  React.useEffect(() => {
    if (data.length && !markets.current.size) {
      markets.current = getFilters(data);
      const Tpn = Array.from(markets.current.keys())[0];
      setFilters({
        pn: Tpn,
      });
    }
  }, [data, data.length]);

  if (requestState.pending) {
    return (
      <LoadingScreenWrapper>
        <CircularProgress />
        <h1>Загрузка</h1>
      </LoadingScreenWrapper>
    );
  }

  if (requestState.error) {
    return (
      <LoadingScreenWrapper>
        <h1>Ошибка при загрузке данных</h1>
      </LoadingScreenWrapper>
    );
  }

  const socketController = () => (
    <>
      <Box paddingTop="8px" />
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <SocketStatusWrapper>
              {socketState === 'connected' && (
                <>
                  <RadioButtonChecked style={{ color: 'green' }} />
                  &nbsp; Connected
                </>
              )}
              {socketState === 'disconnected' && (
                <>
                  <RadioButtonChecked style={{ color: 'red' }} />
                  &nbsp; Disconnected
                </>
              )}
              {socketState === 'connecting' && (
                <>
                  <RadioButtonChecked style={{ color: 'yellow' }} />
                  &nbsp; Connecting
                </>
              )}
            </SocketStatusWrapper>
          </Grid>
          <Grid item>
            {socketState === 'connected' && (
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(socketDisConnect());
                }}
              >
                Disconnect
              </Button>
            )}
            {socketState === 'disconnected' && (
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(socketConnect());
                }}
              >
                Connect
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
      <Box paddingTop="8px" />
      <Divider />
    </>
  );

  const title = () => (
    <>
      <Box paddingTop="8px" />
      <Container maxWidth="xl">
        <Typography variant="h3" gutterBottom>
          Market
        </Typography>
      </Container>
    </>
  );

  const tableToolBar = () => (
    <TableToolbar
      lastCellType={lastCellType}
      onLastCellTypeChange={setLastCellType}
      onSearchSymbolsChange={(newSymbols) => {
        setSearchSymbols(newSymbols);
      }}
      searchSymbols={searchSymbols}
      markets={markets.current}
      filter={filters}
      onFilterChange={(newFilter) => {
        setFilters(newFilter);
      }}
    />
  );

  return (
    <Paper>
      {socketController()}
      {title()}
      {tableToolBar()}
      <TableContainer>
        <WindowScroller scrollElement={window} ref={windowScrollerRef}>
          {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
            <div ref={registerChild}>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Table
                    deferredMeasurementCache={cellMeasurerCache.current}
                    ref={tableref}
                    autoHeight
                    height={height}
                    width={width}
                    rowHeight={cellMeasurerCache.current.rowHeight}
                    headerHeight={80}
                    rowCount={rows.length}
                    onRowClick={({ rowData }) => {
                      dispatch(changeIsFavorite(rowData.id));
                    }}
                    rowGetter={({ index }) => rows[index]}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowRenderer={RowRenderer}
                    headerRowRenderer={HeaderRowRenderer}
                  >
                    {columns
                      .filter((column) => {
                        if (column.id === 'change' || column.id === 'volume') {
                          return column.id === lastCellType;
                        }
                        return true;
                      })
                      .map((columnData) => (
                        <Column
                          key={columnData.id}
                          cellRenderer={CellRenderers[columnData.id](cellMeasurerCache.current)}
                          headerRenderer={(headerCellProps) => {
                            return HeadCellRenderer({
                              ...headerCellProps,
                              id: columnData.id,
                              orderBy,
                              order,
                              numeric: columnData.numeric,
                              onOrderByChange: setOrderBy,
                              onOrderChange: setOrder,
                            });
                          }}
                          dataKey={columnData.id}
                          label={columnData.label}
                          width={columnData.width}
                        />
                      ))}
                  </Table>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      </TableContainer>
    </Paper>
  );
};

export default () => (
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);

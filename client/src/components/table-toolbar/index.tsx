import React from 'react';

import { getFilters, Filter } from 'utils/filter';
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from '@material-ui/core';
import { SearchRounded, Star } from '@material-ui/icons';
import { LastCellType } from 'App';
import { StyledToolbar } from './elements';
import MenuItem from './nav-item';

interface EnhancedTableToolbarProps {
  filter: Filter;
  markets: ReturnType<typeof getFilters>;
  searchSymbols: string;
  onSearchSymbolsChange: (newSymbol: string) => void;
  onFilterChange: (newFilter: Filter) => void;
  onLastCellTypeChange: (newLastCellType: LastCellType) => void;
  lastCellType: LastCellType;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  markets,
  onSearchSymbolsChange,
  filter,
  onFilterChange,
  searchSymbols,
  lastCellType,
  onLastCellTypeChange,
}) => {
  return (
    <StyledToolbar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container id="market-filters">
            <Grid item>
              <IconButton
                size="small"
                onClick={() => {
                  onFilterChange({ isFavorite: true });
                }}
                edge="start"
              >
                <Star color={filter.isFavorite ? 'primary' : 'action'} />
                &nbsp;&nbsp;
              </IconButton>
            </Grid>
            {Array.from(markets.entries())
              .sort((a, b) => a[1].length - b[1].length)
              .map(([category, subcategories]) => {
                return (
                  <Grid item key={category}>
                    <MenuItem
                      category={category}
                      subcategories={subcategories}
                      isActive={filter.pn === category}
                      onChange={onFilterChange}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} wrap="nowrap" alignItems="center">
            <Grid item xs>
              <TextField
                id="search-field"
                value={searchSymbols}
                onChange={(e) => {
                  onSearchSymbolsChange(e.target.value);
                }}
                label="Search coin name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs>
              <FormControl size="small">
                <RadioGroup
                  row
                  value={lastCellType}
                  onChange={(e) => {
                    onLastCellTypeChange(e.target.value as LastCellType);
                  }}
                >
                  <FormControlLabel
                    value="change"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">Change</Typography>}
                  />
                  <FormControlLabel
                    value="volume"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">Volume</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledToolbar>
  );
};

export default EnhancedTableToolbar;

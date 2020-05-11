import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Filter } from 'utils/filter';
import { ArrowDropDown } from '@material-ui/icons';

interface NavItemProps {
  category: string;
  subcategories: string[];
  onChange: (newFilter: Filter) => void;
  isActive: boolean;
}

export default function SimpleMenu({ category, isActive, onChange, subcategories }: NavItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (subcategory: string) => {
    if (subcategory === 'ALL') {
      onChange({ pn: category });
    } else {
      onChange({
        pn: category,
        q: subcategory,
      });
    }
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (subcategories && subcategories?.length > 1) {
      setAnchorEl(event.currentTarget);
    } else {
      handleChange('ALL');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="primary"
        onClick={handleClick}
        variant={isActive ? 'contained' : 'text'}
        size="small"
      >
        {category}
        {subcategories && subcategories?.length > 1 && <ArrowDropDown />}
      </Button>
      {subcategories && subcategories?.length > 1 && (
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleChange('ALL');
            }}
          >
            ALL
          </MenuItem>
          {subcategories?.map((subcategory) => (
            <MenuItem
              onClick={() => {
                handleChange(subcategory);
              }}
              key={subcategory}
            >
              {subcategory}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}

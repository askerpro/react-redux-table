import { styled as muiStyled } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';

export const StyledToolbar = muiStyled(Toolbar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: 'space-between',
  paddingTop: '8px',
  paddingBottom: '8px',
}));

interface MenuItemWrapperProps {
  active: boolean;
}

export const MenuItemWrapper = styled.div<MenuItemWrapperProps>`
  border-bottom: ${({ active, theme }) =>
    active ? `3px solid ${theme.palette.primary.main}` : 'none'};
  height: 100%;
  display: flex;
  align-items: center;
`;

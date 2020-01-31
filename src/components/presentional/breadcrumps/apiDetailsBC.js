import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';



export default function SimpleBreadcrumbs() {
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <Breadcrumbs aria-label="Api Details">
      <Link color="inherit" href="/" onClick={handleClick}>
        Dashboard
      </Link>
      <Typography color="textPrimary">Api Details</Typography>
    </Breadcrumbs>
  );
}
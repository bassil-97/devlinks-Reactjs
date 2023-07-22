import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function LinkSkeleton() {
  return (
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={220} height={60} />
  );
}
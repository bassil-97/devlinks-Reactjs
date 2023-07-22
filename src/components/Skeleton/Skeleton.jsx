import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function UserSkeleton() {
  return (
    <Stack spacing={1} sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
    </Stack>
  );
}
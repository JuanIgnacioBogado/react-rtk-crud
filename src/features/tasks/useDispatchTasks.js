import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { taskSlice } from './taskSlice';

export const useDispatchTasks = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(taskSlice.actions, dispatch), []);
};

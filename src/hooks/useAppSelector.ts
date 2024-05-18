import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {RootState} from '../types/redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;

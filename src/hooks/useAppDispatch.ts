import {useDispatch} from 'react-redux';

import {AppDispatch} from '../types/redux';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;

export { stylesApi } from './api/stylesApi'
export {
    default as styleReducer, addStyle, deleteStyle, updateStyle, fetchStyles,
    selectCurrentStyle, selectStyles, selectStylesError, selectStylesLoading,
    chooseStyle,
    clearCurrentStyle,
    archiveStyle,
    restoreStyle
} from './model/styleSlice'
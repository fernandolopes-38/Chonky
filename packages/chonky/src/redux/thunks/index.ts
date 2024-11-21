import { ChonkyThunk } from '../../types/redux.types';
import { FileHelper } from '../../util/file-helper';
import { reduxActions } from '../reducers';
import { selectors } from '../selectors';

export const reduxThunks = {
    selectRange: (params: {
        rangeStart: number;
        rangeEnd: number;
        reset?: boolean;
    }): ChonkyThunk => (dispatch, getState) => {
        const state = getState();
        if (state.disableSelection) return;
        const displayFileIds = selectors.getDisplayFileIds(state);
        const fileIdsToSelect = displayFileIds
            .slice(params.rangeStart, params.rangeEnd + 1)
            .filter(id => {
                if (state.allFileMap && Object.keys(state.allFileMap).length > 0) {
                    return id && FileHelper.isSelectable(state.allFileMap[id])
                }
                return id && FileHelper.isSelectable(state.fileMap[id])
            }) as string[];

        dispatch(
            reduxActions.selectFiles({
                fileIds: fileIdsToSelect,
                reset: !!params.reset,
            })
        );
    },
};

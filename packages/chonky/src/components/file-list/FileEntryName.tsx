/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';
import { Nullable } from 'tsdef';

import { FileData } from '../../types/file.types';
import { makeLocalChonkyStyles } from '../../util/styles';
import { useFileNameComponent, useModifierIconComponents } from './FileEntry-hooks';
import { useSelector } from 'react-redux';
import { selectFileViewConfig } from '../../redux/selectors';
import { FileViewMode } from '../../types/file-view.types';

export interface FileEntryNameProps {
    file: Nullable<FileData>;
    className?: string;
}

export const FileEntryName: React.FC<FileEntryNameProps> = React.memo(({ file, className }) => {
    const classes = useStyles();
    const viewConfig = useSelector(selectFileViewConfig);
    let width = undefined;
    let justifyContent = 'flex-start';
    if (viewConfig.mode === FileViewMode.Grid) {
        width = viewConfig.entryWidth;
        justifyContent = 'center';
    }
    const modifierIconComponents = useModifierIconComponents(file);
    const fileNameComponent = useFileNameComponent(file, classes.fileNameContainer, classes.truncatedName, width, justifyContent);

    return (
        <span className={className} title={file ? file.name : undefined}>
            {modifierIconComponents.length > 0 && (
                <span className={classes.modifierIcons}>{modifierIconComponents}</span>
            )}
            {fileNameComponent}
        </span>
    );
});
FileEntryName.displayName = 'FileEntryName';

const useStyles = makeLocalChonkyStyles(theme => ({
    modifierIcons: {
        color: theme.palette.text.hint,
        position: 'relative',
        fontSize: '0.775em',
        paddingRight: 5,
    },
    fileNameContainer: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    truncatedName: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
}));

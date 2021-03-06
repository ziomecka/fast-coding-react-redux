import {
    FC_FORM_WIDTH_XS,
    FC_FORM_WIDTH_SM
} from './constants';

import {
    NAV_HEIGHT_MD
} from '@constantsStyles';

const styles = theme => {
    const { typography: { body1: { fontSize } } } = theme;

    return {
        FCForm: {
            '& input, label': {
                fontSize: '1rem'
            },
            [ theme.breakpoints.only( 'xs' ) ]: {
                height: `calc(100vh - ${ NAV_HEIGHT_MD }px - 2rem - 1em)`,
                width: FC_FORM_WIDTH_XS,
                justifyContent: 'flex-start',
            },
            [ theme.breakpoints.up( 'sm' ) ]: {
                justifyContent: 'center',
                minWidth: FC_FORM_WIDTH_SM,
                '& input, label': {
                    fontSize: 'inherit'
                },
            },
            overflow: 'hidden'
        },
        FCFormButton: {
            width: '100%'
        },
        FCFormButtonText: {
            fontSize
        }
    };
};

export default styles;

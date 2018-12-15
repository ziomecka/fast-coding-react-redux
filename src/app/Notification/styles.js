import { PAPER_PADDING, NOTIFICATION_FONTSIZE } from '../../constants';

const styles = theme => {
    const {
        spacing: { unit },
        palette: {
            primary: { dark: successBackground, contrastText: successText },
            secondary: { dark: errorBackground, contrastText: errorText }
        }
    } = theme;

    return {
        notificationIcon: {
            fontSize: NOTIFICATION_FONTSIZE,
            marginLeft: unit,
            marginRight: unit
        },
        notificationMessageSuccess: {
            fontSize: NOTIFICATION_FONTSIZE,
            color: successText,
            backgroundColor: successBackground,
        },
        notificationContentSuccess: {
            padding: PAPER_PADDING,
            backgroundColor: successBackground,
        },
        notificationIconSuccess: {
            color: successText
        },
        notificationMessageError: {
            fontSize: NOTIFICATION_FONTSIZE,
            color: errorText,
            backgroundColor: errorBackground
        },
        notificationContentError: {
            padding: PAPER_PADDING,
            backgroundColor: errorBackground
        },
        notificationIconError: {
            color: errorText
        }
    };
};

export default styles;
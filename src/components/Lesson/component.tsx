import * as React from 'react';
import { LessonProps } from './container';

import Comparator from './Comparator/container';
import LessonButtons from './LessonButtons/container';
import Stats from './Stats/container';
import Paper from '@material-ui/core/Paper';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import Smile from '@material-ui/icons/Mood';

class LessonComponent extends React.Component<LessonProps> {
    style: React.CSSProperties;
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        this.props.registerOnDrop(this.onDrop);
    }

    componentWillUnmount() {
        /** no matter if running or not, cheaper than checking */
        this.props.reset();
        this.props.deregisterOnDrop(this.onDrop);
    }

    invite (txt: JSX.Element): JSX.Element {
        return (
            <p
                className={this.props.classes.lessonInvite}
            >
                {txt}
            </p>
        );
    }

    onDrop (e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        const { clientX, clientY } = e;
        this.props.onMoveLesonButtons(clientY, clientX);
    }

    render() {
        const { ended, started } = this.props;
        const { lessonPaper, lessonInvite } = this.props.classes;

        return (
            <>
                <Paper className={lessonPaper}>
                    { !started
                        ? this.invite(<span className={lessonInvite}>You can start typing <Smile /> </span>)
                        : this.invite(<span>&nbsp;</span>)
                    }

                    <Comparator />
                </Paper>
                { ended && <Stats /> }
                <LessonButtons />
            </>
        );
    }
}

export default withStyles(styles)(LessonComponent);
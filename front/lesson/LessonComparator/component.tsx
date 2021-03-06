import * as React from 'react';

import { LessonComparatorProps } from './container';

import LessonText from '@lesson/LessonText/';

class LessonComparatorComponent extends React.Component<LessonComparatorProps> {
    constructor( props ) {
        super( props );
    }

    scroll( id: string ): void {
        let htmlElement = document.getElementById( id );
        if ( htmlElement ) {
            htmlElement.scrollIntoView( false );
            htmlElement = null; // GC
        }
    }

    componentDidMount() {
        if ( !this.props.paused ) {
            this.props.listenKeys();
        }
    }

    componentWillUnmount() {
        this.props.stopListenKeys();
    }

    componentDidUpdate( prevProps: LessonComparatorProps ) {
        const {
            props: { currentSignIndex, lessonText, paused }
        } = this;
        const prevCurrentSignIndex = prevProps.currentSignIndex;

        if ( currentSignIndex !== prevCurrentSignIndex ) {
            if ( currentSignIndex === 0 ) {
                this.props.startLesson();
                this.props.turnOnLessonComparator();
            }

            if ( currentSignIndex >= lessonText.length - 1 ) {
                this.props.endingLesson();
            }

            this.scroll( `letter-${currentSignIndex + 3}` );
        }

        if ( paused !== prevProps.paused ) {
            if ( !paused ) {
                this.props.unpauseLessonComparator();
            } else {
                this.props.pauseLessonComparator();
            }
        }
    }

    render () {
        return (
            <LessonText />
        );
    }
}

export default LessonComparatorComponent;

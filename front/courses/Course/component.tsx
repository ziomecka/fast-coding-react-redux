import * as React from 'react';

import { CourseProps } from './container';
import { LessonData } from '@lesson/LessonComponent/';
import CoursesStepper from '@courses/CoursesStepper/';

import { AppRoutesEnum } from '@appTypes';
import styles from './styles';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';

/** Materials core */
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ReviewIcon from '@material-ui/icons/Replay';

/** Materials icons */
import ExpandMore from '@material-ui/icons/ExpandMore';
import { getActiveLanguage, Translate } from 'react-localize-redux';

import { withMedia, MediaEnum } from '@app/Media/';

import {
    TRANSITION_DURATION,
    SPACING_BEETWEEN_LESSONS,
    GRID
} from './constants.styles';

import {
    NAV_HEIGHT_LG,
    NAV_HEIGHT_MD,
} from '@constantsStyles';

import { LessonsTypesEnum, CourseGrid } from './_duck/';

require( './style.sass' );

/**
 * Needed for renderig lessons.
 * If course is not expanded then
 * lessons will be an empty array.
 * Otherwise lessons === this.props.lessons
 */
interface ICourseState {
    lessons: LessonData[];
}

/**
 * Main assumption: lessons' property 'no' start always from 0
 */
class CourseComponent extends React.Component<CourseProps, ICourseState> {
    lessonsRoute: AppRoutesEnum;
    timeout: any
    grid: CourseGrid;
    xs: MediaEnum;
    lg: MediaEnum;
    xl: MediaEnum;
    review: LessonsTypesEnum;
    icons: Map<LessonsTypesEnum, JSX.Element>
    constructor( props ) {
        super( props );

        this.lessonsRoute = AppRoutesEnum.lessons;

        /** If course is expanded then lessons otherwise empty array */
        this.state = {
            lessons: this.isExpanded ? this.props.lessons : [],
        };

        this.handleOnClick = this.handleOnClick.bind( this );

        this.grid = GRID;

        this.xs = MediaEnum.xs;
        this.lg = MediaEnum.lg;
        this.xl = MediaEnum.xl;

        const { props: { classes: { iconClass } } } = this;

        Object.assign( this, LessonsTypesEnum );

        this.icons = new Map( [
            [ this.review, <ReviewIcon className={ iconClass } /> ]
        ] );
    }

    handleOnClick( lesson: LessonData ): void {
        const { _id } = lesson;
        const randomLesson = false;
        if ( randomLesson ) {
            this.props.handleOpenRandomLesson( lesson );
        } else {
            this.props.handleOpenLesson( lesson );
        }

        this.props.history.push( `${this.lessonsRoute}/${_id}` );
    }

    get langCode () {
        return getActiveLanguage( this.props.localize ).code;
    }

    get numberOfLessons () {
        return this.props.lessons.length;
    }

    get id () {
        return this.props._id;
    }

    get isExpanded() {
        return ( this.props.openedCourseId === this.id );
    }

    /** Scroll needed e.g. when lessons entered from lesson */
    componentWillMount() {
        this.scroll();
    }

    componentWillUnmount() {
        document.querySelector( 'body' ).scroll( { top: 0 } );
    }

    /**
     *  Scroll the body to the course
     */
    scroll( id = this.props.openedCourseId, smooth = true ) {
        if ( id ) {
            const {
                props: {
                    theme: { transitions: { duration: { [ TRANSITION_DURATION ]: duration } } },
                    media
                },
                lg, xl, xs
            } = this;


            this.timeout = setTimeout( () => {
                let body = document.querySelector( 'body' );

                /** Course's top relative to the viewport */
                const { top } = document.getElementById( id ).getBoundingClientRect();
                /** Body is scrolled by */
                const { scrollTop } = body;

                // TODO - simplify when NAV_HEIGHT GRID implementes
                const NAV_HEIGHT = ( media === lg || media === xl )
                    ? NAV_HEIGHT_LG
                    : ( media === xs )
                        ? 0 // 0 because Nav has posisition absiolute not fixed - is moving up
                        : NAV_HEIGHT_MD;

                body.scroll( {
                    top: Math.min( Math.max( top + scrollTop - NAV_HEIGHT, 0, top - NAV_HEIGHT ), top + scrollTop ),
                    behavior: smooth ? 'smooth' : 'auto'
                } );

                body = null; // GC
                clearTimeout( this.timeout ); // GC
            }, duration );
        }
    }

    getLessonsGrid() {
        const spacing = SPACING_BEETWEEN_LESSONS * this.props.theme.spacing.unit;
        const { props: { media } } = this;
        const { cols, cellHeight } = this.grid.get( media );

        return (
            <GridList
                classes={{ root: this.props.classes.lessonsContainerClass }}
                /** Id needed for scrolling within course window - coursesStepper */
                id={ `details-${ this.id }` }
                { ...{ spacing, cols, cellHeight } }
            >
                { this.lessons }
            </GridList>
        );
    }

    get course () {
        let {
            id,
            langCode,
            props: {
                classes: {
                    panelClass,
                    collapsedContainerClass,
                    collapsedEnteredClass,
                    collapsedWrapperClass,
                    summaryContentClass,
                    summaryExpandedClass,
                    expansionButtonClass,
                    detailsLessonsClass,
                    summaryHeadingClass,
                    summaryDescriptionClass,
                    summaryRootClass
                }
            },
            isExpanded
        } = this;

        const { props: {
            // @ts-ignore
            title: { [ langCode ]: title },
            // @ts-ignore
            description: { [ langCode ]: description },
        } } = this;

        return (
            <ExpansionPanel
                key={ id }
                className={ panelClass }
                expanded={ isExpanded }
                CollapseProps={{
                    classes: {
                        container: collapsedContainerClass,
                        entered: collapsedEnteredClass,
                        wrapper: collapsedWrapperClass
                    }
                }}
                onChange={ async ( event, expanded ) => {
                    /** If course is expanded */
                    if ( expanded ) {
                        /** Inform other courses so that they can close */
                        let answer = await this.props.openCourse( id );

                        /** When Other courses are already collapsed
                         * Render lessons and after that
                         * scroll the body to the course that is opened
                         * */
                        if ( answer ) {
                            this.setState( () => ( {
                                lessons: this.props.lessons
                            } ), () => this.scroll() );
                        }
                    } else {
                        /** Do not render lessons */
                        this.setState( { lessons: [] } );

                        /**
                         * Close the course.
                         */
                        let answer = await this.props.closeCourse( id );

                        /**
                         * If the course has been closed and
                         * no other course is opened then
                         * Scroll the body to this particular course
                         */
                        if ( answer && !this.props.openedCourseId ) {
                            this.scroll( id );
                        }
                    }
                }}
            >
                <ExpansionPanelSummary
                    {...{ id } }
                    tabIndex={ -1 }
                    expandIcon={ <ExpandMore /> }
                    classes={{
                        root: summaryRootClass,
                        content: summaryContentClass,
                        expanded: summaryExpandedClass,
                        expandIcon: expansionButtonClass
                    }}
                >
                    <div>
                        <Typography variant="h3" className={ summaryHeadingClass }>
                            { title }
                        </Typography>

                        <Typography variant="h4" className={ summaryDescriptionClass }>
                            { description }
                        </Typography>
                    </div>
                    { isExpanded && <CoursesStepper /> }
                </ExpansionPanelSummary>

                <Grid
                    container
                    classes={{ container: detailsLessonsClass }}
                    component={ ExpansionPanelDetails }
                >
                    { this.getLessonsGrid() }
                </Grid>
            </ExpansionPanel>
        );
    }

    getIcon( type: LessonsTypesEnum ): JSX.Element {
        return this.icons.get( type );
    }

    get lessons () {
        let {
            props: {
                classes: {
                    lessonTileContainerClass,
                    lessonTileClass,
                    lessonCardButtonClass,
                    lessonCardButtonLabelClass,
                    lessonCardLinkTextClass
                }
            },
            langCode,
            review
        } = this;

        return this.state.lessons.map( ( lesson: LessonData ) => {
            // @ts-ignore
            let { _id, title: { [ langCode ]: title }, no, type } = lesson;

            const isReview = type.indexOf( review ) !== -1;

            return (
                <Grid
                    item
                    container
                    key={ _id }
                    component='li'
                    classes={{ item: lessonTileClass }}
                    id={ `card-${ no }` }
                    tabIndex={ -1 } // single lesson is focusable
                >
                    {/*
                    // @ts-ignore */}
                    <GridListTile component='div'  className={ lessonTileContainerClass }>
                        <Button
                            onClick={ () => this.handleOnClick( lesson ) }
                            classes={ {
                                root: lessonCardButtonClass
                            } }
                        >
                            <Typography variant="h5" className={ lessonCardButtonLabelClass } >
                                <span className={ lessonCardLinkTextClass }>
                                    <Translate id="lessonsLesson" />
                                    &nbsp;
                                    { no + 1 }
                                </span>
                                <span className={ lessonCardLinkTextClass }>
                                    { title }
                                </span>
                                { isReview && this.getIcon( review ) }
                            </Typography>
                        </Button>
                    </GridListTile>
                </Grid>
            );
        } );
    }

    render () {
        const {
            isExpanded,
            props: { classes: {
                gridListTileTileClass,
                gridListTileRootClass,
                gridListTileRootCollapsedClass,
                gridListTileRootExpandedClass,
            } }
        } = this;

        return (
            <GridListTile
                classes={{
                    root: `${ isExpanded
                        ? gridListTileRootClass + ' ' + gridListTileRootExpandedClass
                        : gridListTileRootClass + ' ' + gridListTileRootCollapsedClass
                    }`,
                    tile: gridListTileTileClass
                }}
            >
                { this.course }
            </GridListTile>
        );
    }
}

export default withStyles( styles )( withTheme()( withMedia( CourseComponent ) ) );

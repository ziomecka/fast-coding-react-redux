import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { MenuListProps, MenuListItemType } from './container';
import { LanguagesEnum } from '@applicationTypes';
import { AppRoutesEnum, SubMenuRulesEnum } from '@appTypes';

/* Materials */
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import getTranslation from '@shared/get.translation';

import { withMenuRules } from '../MenuRulesHoc/';

/**
 * @param { boolean } render                  - is menu rendered?
 *                                              Changes only if props authorized or location.pathname do change
 *                                              Increases menu responsiveness
 * @param { JSX.Element[] | MenuListItemType } - containes list of menuItems to be dispalayed.
 *                                              Is updated with delay because menu is transitioning (hiding) and
 *                                                during transtion menu should not be updating
 * */
interface InternalState {
    render: boolean;
    listItems: JSX.Element[] | MenuListItemType
};

class MenuListComponent extends React.Component<MenuListProps, InternalState> {
    private _listTimeout: number;
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClickAway = this.handleClickAway.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            render: this.areNavRulesMet,
            listItems: this.listItems
        }

        this._listTimeout = 1000;
    }

    get anchorEl () {
        const { container } = this.props;

        return (
            this.props[ container ]
                ? this.props[ container ].anchorEl
                : null
        );
    }

    componentDidUpdate(prevProps: MenuListProps) {
        const { props: { location: { pathname }, authorized, menuItems } } = this;
        const { location: { pathname: prevPathname }, authorized: prevAuthorized, menuItems: prevMenuItems } = prevProps;

        /**
         *  Updates menu only if pathname or authorization changed, therefore
         *  menu ressponsiveness is increased.
         *
         *  Moreove: listItems are updated with delay, therefore
         *  menu items do not change when menu is transitioning
         */
        if (( pathname !== prevPathname || authorized !== prevAuthorized )) {
            // @ts-ignore
            this.setState(() => (
                { render: this.areNavRulesMet && this.atLeastOneItem }
                ), () => {
                    let timeout = setTimeout( () => {
                        this.setState({ listItems: this.listItems });
                        clearTimeout( timeout ); // GC
                        timeout = null; // GC
                    }, this._listTimeout );
                }
            );
        }

        /** if menuItems && the nnumber of menu items has changed then set new listItems */
        if ( menuItems && (
                Object.keys(prevMenuItems).length === 0 &&
                Object.keys(menuItems).length > 0)
            ) {
            this.setState({
                listItems: this.listItems
            });
        }
    }

    handleClick (event: React.MouseEvent<HTMLButtonElement>) {
        this.props.setNavAnchorEl(this.props.container, event.currentTarget);
    }

    handleClose (loc: string) {
        this.props.history.push(loc);
        if (this.props.container) {
            this.props.setNavAnchorEl(this.props.container);
        }
    };

    handleClickAway () {
        if (this.anchorEl) {
            this.props.setNavAnchorEl(this.props.container);
        }
    };

    /** If function for rule is not implemented an error will be thrown */
    areMenuListRulesMet (rules: SubMenuRulesEnum[], pathname: AppRoutesEnum, lang?: LanguagesEnum | ''): boolean {
        // @ts-ignore
        return (!rules || rules.every(rule => this.props.menuRules({ path: pathname, lang })[rule]()));
    };

    /** If function for rule is not implemented an error will be thrown */
    get areNavRulesMet (): boolean {
        return (!this.props.rules || this.props.rules.every(rule => this.props.menuRules()[rule]()));
    };

    getLink (appRoute: AppRoutesEnum, title: string, className: string) {
        let ind = 0;

        return (
            <MenuItem
                onClick={ () => this.handleClose(appRoute) }
                key={ `link-${ title }-${ ind++ }` }
                divider={ true }
                {...{ className }}
            >
                <NavLink to={ appRoute }>
                    { getTranslation(this.props.localize, title) }
                </NavLink>
            </MenuItem>
        );
    };

    getButton (onClick, title: string, className: string) {
        let ind = 0;
        return (
            <MenuItem
                {...{ onClick }}
                key={ `button-${ title }-${ ind++ }` }
                divider={ true }
                {...{ className }}
            >
                { getTranslation(this.props.localize, title, title) }
            </MenuItem>
        );
    };

    getIconButton (onClick) {
        const {
            iconButton: { className: iconButtonClassName, ...other } = { className: '' },
            classes: { menuIconClass },
            icon // TODO GC?
        } = this.props;

        return (
            <IconButton
                className={ `${ menuIconClass } ${ iconButtonClassName }` }
                { ...other }
                { ...{ onClick } }
            >
                { icon }
            </IconButton>
        );
    }

    /**
     * @description Check if list contains at lest one item. Items are rendered only if their conditions are met
     *              It may happen that none item meets conditions. List should not be rendered.
     *              If menu is only a button ( has this.props.menuItem ) then rendered always
     *              // TODO wynika z przekombinowania opisanego powyżej
     */
    get atLeastOneItem () {
        return (
            this.props.menuItems.some( item => this.areMenuListRulesMet(item.rules, item.appRoute, item.lang || '' ))
        );
    }

    get listItems () {
        const {
            classes: { menuItemClass },
        } = this.props;

        return (
            this.props.menuItems.map((menuItem) => {
                const { rules, appRoute, title, onClick, lang = '' } = menuItem;

                if ( this.areMenuListRulesMet(rules, appRoute, lang )) {
                    return (
                        ( appRoute && this.getLink( appRoute, title, menuItemClass ) ) ||
                        ( onClick && this.getButton( onClick, title, menuItemClass ) )
                    );
                }
                return null;
            })
        );
    }

    renderList () {
        const {
            props: {
                classes: { menuClass },
                title
            },
            anchorEl
        } = this;

        /** Render list only if at least one item meets the rules */
        return (
            <ClickAwayListener onClickAway={ this.handleClickAway }>
                <>
                    {
                        (title && (
                            <Tooltip title={getTranslation(this.props.localize, title)}>
                                { this.getIconButton(this.handleClick) }
                            </Tooltip>
                        )) ||
                        this.getIconButton(this.handleClick)
                    }

                    {/** Could be redered only when anchorEl. It decreases menu's responsiveness */}
                    {<Menu
                        anchorEl={ anchorEl }
                        open={ Boolean(anchorEl) }
                        classes={ { paper : menuClass } }
                    >
                        { this.state.listItems }
                    </Menu>}
                </>
            </ClickAwayListener>
        );
    }

    render () {
        if ( this.state.render ) {
            return (
                <>
                    { this.renderList() }
                </>
            );
        }
        return null;
    }
}

export default withMenuRules(withStyles(styles)(MenuListComponent));
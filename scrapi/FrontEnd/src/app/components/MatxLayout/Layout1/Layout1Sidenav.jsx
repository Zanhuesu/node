import React from 'react'
import Brand from '../../Brand/Brand'
import { convertHexToRGB } from 'app/utils/utils'
import { Link } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import Sidenav from '../../Sidenav/Sidenav'
import useSettings from 'app/hooks/useSettings'
import { MatxMenu } from 'app/components'
import { Span } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Switch,
    Hidden,
} from '@mui/material'

const SidebarNavRoot = styled(Box)(({ theme, width, primaryBg, bgImgURL }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: width,
    boxShadow: themeShadows[8],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    zIndex: 111,
    overflow: 'hidden',
    color: theme.palette.text.primary,
    transition: 'all 250ms ease-in-out',
    backgroundImage: `linear-gradient(to bottom, rgba(${primaryBg}, 0.96), rgba(${primaryBg}, 0.96)), url(${bgImgURL})`,
    '&:hover': {
        width: sideNavWidth,
        '& .sidenavHoverShow': {
            display: 'block',
        },
        '& .compactNavItem': {
            width: '100%',
            maxWidth: '100%',
            '& .nav-bullet': {
                display: 'block',
            },
            '& .nav-bullet-text': {
                display: 'none',
            },
        },
    },
}))

const NavListBox = styled(Box)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
        margin: '0 8px',
    },
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': {
        marginRight: '10px',
        color: theme.palette.text.primary,
    },
}))

const Layout1Sidenav = () => {
    const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const { logout, user } = useAuth()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode, bgImgURL } = leftSidebar

    const getSidenavWidth = () => {
        switch (mode) {
            case 'compact':
                return sidenavCompactWidth
            default:
                return sideNavWidth
        }
    }
    const primaryRGB = convertHexToRGB(theme.palette.primary.main)

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidenavToggle = () => {
        updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' })
    }

    return (
        <SidebarNavRoot
            bgImgURL={bgImgURL}
            primaryBg={primaryRGB}
            width={getSidenavWidth()}
        >
            <NavListBox>
                <Brand>
                    <Hidden smDown>
                        <Switch
                            onChange={handleSidenavToggle}
                            checked={leftSidebar.mode !== 'full'}
                            color="secondary"
                            size="small"
                        />
                    </Hidden>
                </Brand>
                {/* <MatxMenu
                    menuButton={
                        <UserMenu>
                            <Hidden xsDown>
                                <Span>
                                    <strong>{user.username}</strong>
                                </Span>
                            </Hidden>
                            <Avatar
                                src={user.avatar}
                                sx={{ cursor: 'pointer' }}
                            />
                        </UserMenu>
                    }
                >
                    <StyledItem>
                        <Link to="/">
                            <Icon> home </Icon>
                            <Span> Home </Span>
                        </Link>
                    </StyledItem>
                    <StyledItem>
                        <Link to="/page-layouts/user-profile">
                            <Icon> person </Icon>
                            <Span> Profile </Span>
                        </Link>
                    </StyledItem>
                    <StyledItem>
                        <Icon> settings </Icon>
                        <Span> Settings </Span>
                    </StyledItem>
                    <StyledItem onClick={logout}>
                        <Icon> power_settings_new </Icon>
                        <Span> Logout </Span>
                    </StyledItem>
                </MatxMenu> */}
                <Sidenav />
            </NavListBox>
        </SidebarNavRoot>
    )
}

export default React.memo(Layout1Sidenav)

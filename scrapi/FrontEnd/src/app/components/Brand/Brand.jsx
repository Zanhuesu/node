import React from 'react'
import { MatxLogo } from 'app/components'
import logo from '../../../assets/AutonomusLogo.png'
import { Span } from '../../components/Typography'
import { styled, Box } from '@mui/system'
import useSettings from 'app/hooks/useSettings'

const BrandRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 18px 20px 19px',
}))

const StyledSpan = styled(Span)(({ theme, mode }) => ({
    fontSize: 18,
    marginLeft: '.5rem',
    display: mode === 'compact' ? 'none' : 'block',
}))

const Brand = ({ children }) => {
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    return (
        <BrandRoot>
            <Box display="flex" alignItems="center">
                {/* <MatxLogo /> */}
                <img src={logo} className='App-logo' alt='logo' style={{width: '40px'}} />
                <StyledSpan mode={mode} className="sidenavHoverShow">
                    Autonomous
                </StyledSpan>
            </Box>
            <Box
                className="sidenavHoverShow"
                sx={{ display: mode === 'compact' ? 'none' : 'block' }}
            >
                {children || null}
            </Box>
        </BrandRoot>
    )
}

export default Brand

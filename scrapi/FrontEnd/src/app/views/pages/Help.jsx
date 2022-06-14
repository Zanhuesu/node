import React, { Fragment } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import DoughnutCard from '../dashboard/shared/DoughnutCard'
import HelpCard from '../dashboard/shared/HelpCard'
import StayCard from '../dashboard/shared/StayCard'
import { styled, useTheme } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import img_addUmbrella from '../../../assets/addUmbrella.png'
import img_affection from '../../../assets/affection.png'
import img_human from '../../../assets/human.png'
import img_1 from '../../../assets/Asset1.png'
import img_2 from '../../../assets/Asset2.png'
import img_3 from '../../../assets/Asset3.png'
import {
    Grid,
    Card,
    MenuItem,
    Select,
} from '@mui/material'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const HelpPage = () => {
    const { palette } = useTheme()
    const { logout, user } = useAuth()
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Help', path: '/help' },
                        // { name: 'Table' },
                    ]}
                />
            </div>
            <div style={{padding: '20px 10px', margin: 'auto'}}>                
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <HelpCard 
                                    img = {img_1}
                                    paragraph = {'Technical Questions?'}
                                    paragraph2 = {'Chat with our bot agent'}
                                    route = {'Ask Jhon'}/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <HelpCard 
                                    img = {img_2}
                                    paragraph = {'Talk to a human'}
                                    paragraph2 = {'Mon Sat 10 am -11pm EST'}
                                    route = {'1-886-7658'}/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <HelpCard 
                                    img = {img_3}
                                    paragraph = {'You like to read?'}
                                    paragraph2 = {'Check our Publications'}
                                    route = {'Read'}/>
                            </Grid>
                        </Grid>
                        
                    </Grid> 
                </Grid>
            </div>
        </Container>
        
    )
}

export default HelpPage

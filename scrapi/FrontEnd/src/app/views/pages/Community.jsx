import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import DoughnutCard from '../dashboard/shared/DoughnutCard'
import {
    Grid,
    TextField,
    Card,
    MenuItem,
    Select,
    Button,
    Icon
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

const Community = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Community', path: '/community' },
                        // { name: 'Table' },
                    ]}
                />
            </div>
            <div style={{padding: '20px 10px', maxWidth: '500px', margin: 'auto'}}>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} sm={12} md={12}>
                        <DoughnutCard 
                            name = {'Total Reserves'}
                            data={[
                                {
                                    value: 65,
                                    name: 'total reserves',
                                },
                                {
                                    value: 35,
                                    name: 'other',
                                },
                            ]}
                            value = {'100,000'}
                            percent = {12}
                        />
                        <DoughnutCard 
                            name = {'Total Claims'}
                            data={[
                                {
                                    value: 65,
                                    name: 'total claims',
                                },
                                {
                                    value: 35,
                                    name: 'other',
                                },
                            ]}
                            value = {'9,000'}
                            percent = {16}
                        />
                        <DoughnutCard 
                            name = {'Members'}
                            data={[
                                {
                                    value: 35,
                                    name: 'members',
                                },
                                {
                                    value: 305,
                                    name: 'other',
                                },
                            ]}
                            value = {'35'}
                            percent = {12}
                        />
                    </Grid>
                </Grid>
            </div>
            
        </Container>
    )
}

export default Community

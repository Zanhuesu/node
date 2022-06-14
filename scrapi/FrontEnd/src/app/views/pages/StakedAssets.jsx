import React, { useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import {Span } from 'app/components/Typography'
import useAuth from 'app/hooks/useAuth'
import {
    Grid,
    TextField,
    Card,
    MenuItem,
    Select,
    Button,
    Icon
} from '@mui/material'
import RiskCard from '../dashboard/shared/RiskCard'
import img_bitcoin from '../../../assets/Bitcoin.png'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '20px',
        },
    },
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    paddingBottom: '5px',
    color: theme.palette.text.primary,
}))

const Paragraph2 = styled('span')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    paddingBottom: '5px',
    paddingLeft: '20px',
    color: theme.palette.text.secondary,
}))

const CardRoot = styled(Card)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: 'white',
    padding: '20px !important',
    paddingTop: '10px !important',
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const Budget = styled('p')(({ theme }) => ({
    margin: 0,
    marginTop: '30px',
    fontSize: '1.7rem',
    fontWeight: '500',
    color: theme.palette.text.primary,
}))

const StackedAssets = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Staked Assets', path: '/stakedassets' },
                        // { name: 'Table' },
                    ]}
                />
            </div>
            <div style={{padding: '20px 10px', maxWidth: '900px', margin: 'auto'}}>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} sm={4} md={4}>
                        <CardRoot>
                            <StyledCard elevation={0}>
                                <img
                                    src={img_bitcoin}
                                    alt="upgrade"
                                />
                                <Budget>
                                    $1200
                                </Budget>
                                <Paragraph style={{color: "#4fb164", fontSize: '0.8rem'}}>
                                    +4.5%
                                </Paragraph>
                            </StyledCard>
                        </CardRoot>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} >
                        <Paragraph>Staked Date: 
                            <Paragraph2>Feb 24, 2022</Paragraph2>
                        </Paragraph>
                        <Box py="5px" />
                        <Paragraph>Amount: 
                            <Paragraph2>500.00 USD</Paragraph2>
                        </Paragraph>
                        <Box py="5px" />
                        <Paragraph>Price at Stake: 
                            <Paragraph2>10.00 USD</Paragraph2>
                        </Paragraph>
                        <Box py="5px" />
                        <Paragraph>Current Price: 
                            <Paragraph2>50.00 USD</Paragraph2>
                        </Paragraph>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}  style={{textAlign: 'center'}}>
                        <Button style={{marginTop: '20px', width: '100%'}} color="primary" variant="contained" type="submit">
                            {/* <Icon>done</Icon> */}
                            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                Top Up
                            </Span>
                        </Button>
                    </Grid>
                    
                    
                </Grid>                
            </div>
        </Container>
    )
}

export default StackedAssets

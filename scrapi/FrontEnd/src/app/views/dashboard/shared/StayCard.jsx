import React from 'react'
import { Card, Grid, Button } from '@mui/material'
import { styled } from '@mui/system'
import { convertHexToRGB } from 'app/utils/utils'

const CardRoot = styled(Card)(({ theme }) => ({
    padding: '10px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    width: '380px',
    margin: 'auto',
    boxShadow: 'none',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: 'white',
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    paddingTop: '25px',
    paddingBottom: '10px',
    color: theme.palette.text.secondary,
}))

const Budget = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '1.7rem',
    fontWeight: '500',
    paddingBottom: '12px',
    color: theme.palette.text.primary,
}))

const StayCard = (props) => {
    return (
        <CardRoot>
            <StyledCard elevation={0}>
                <img
                    src={props.img}
                    alt="upgrade"
                />
                <Grid container spacing={3} sx={{ mb: '24px' }}>
                    <Grid item md={6} style={{textAlign: 'left'}}>
                        <Paragraph>
                            {props.date}
                        </Paragraph>
                    </Grid>
                    <Grid item md={6} style={{textAlign: 'right'}}>
                        <Paragraph>
                            {props.label}
                        </Paragraph>
                    </Grid>
                </Grid>
            </StyledCard>
        </CardRoot>
    )
}

export default StayCard

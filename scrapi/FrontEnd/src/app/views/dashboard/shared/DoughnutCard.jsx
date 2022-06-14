import React from 'react'
import { Grid, Card, Button } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import DoughnutChart from './Doughnut'


const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '1rem',
    paddingTop: '25px',
    paddingBottom: '10px',
    color: theme.palette.text.secondary,
}))

const Title = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '1.2rem',
    paddingTop: '60px',
    paddingBottom: '10px',
    color: theme.palette.text.primary,
}))

const SCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none !important'
}))

const DoughnutCard = (props) => {
    const { palette } = useTheme()
    return (
        <SCard>
            <Grid container spacing={3}>
                <Grid item lg={7} md={7} sm={7} xs={7}>
                    <DoughnutChart
                        height="214px"
                        color={[
                            palette.primary.dark,
                            palette.primary.light,
                        ]}
                        data={props.data}
                        name = {props.value}
                    />
                </Grid>
                <Grid item lg={5} md={5} sm={5} xs={5}>
                    <Title>
                        {props.name}
                    </Title>
                    <Paragraph>{props.percent}%</Paragraph>
                </Grid>
            </Grid>            
        </SCard>
    )
}

export default DoughnutCard

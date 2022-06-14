import React from 'react'
import { Card, Button } from '@mui/material'
import { styled } from '@mui/system'
import { convertHexToRGB } from 'app/utils/utils'

const CardRoot = styled(Card)(({ theme }) => ({
    padding: '10px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
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
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
}))

const Paragraph2 = styled('p')(({ theme }) => ({
    margin: 0,
    paddingBottom: '10px',
    color: theme.palette.text.secondary,
}))

const Budget = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '1rem',
    fontWeight: '500',
    paddingBottom: '12px',
    color: 'blue',
}))

const HelpCard = (props) => {
    return (
        <CardRoot>
            <StyledCard elevation={0}>
                <img
                    src={props.img}
                    alt="upgrade"
                />
                <Paragraph>
                    {props.paragraph}
                </Paragraph>
                <Paragraph2>
                    {props.paragraph2}
                </Paragraph2>
                <Budget>
                    <a href="#">{props.route}</a> -&gt;
                </Budget>
            </StyledCard>
        </CardRoot>
    )
}

export default HelpCard

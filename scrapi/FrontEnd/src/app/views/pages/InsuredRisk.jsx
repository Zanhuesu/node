import React, { useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import {
    Grid,
    TextField,
    Card,
    MenuItem,
    Select,
    Button
} from '@mui/material'
import RiskCard from '../dashboard/shared/RiskCard'
import img_icon from '../../../assets/icon.png'

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

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    paddingLeft: '30px',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    paddingBottom: '5px',
    color: theme.palette.text.primary,
}))

const Paragraph2 = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    fontSize: '14px',
    paddingBottom: '5px',
    color: theme.palette.text.secondary,
}))

const InsuredRisk = () => {
    const [name_editable, setNameEditable] = useState(false);
    const [email_editable, setEmailEditable] = useState(false);
    const [email_verified, setEmailVerified] = useState(false);
    const [mobile_editable, setMobileEditable] = useState(false);
    const [mobile_verified, setMobileVerified] = useState(false);
    const { logout, user } = useAuth()
    const [name, setName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [mobile, setMobile] = useState("+61 426663243");
    
    const onChangeName = (e) => {
        setName(e.target.value);
        console.log(user);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmailVerified(false);
    }
    const onVerifyEmail = () => {
        console.log(user.email);
        setEmailVerified(true);
    }
    const onChangeMobile = (e) => {
        setMobile(e.target.value);
        setMobileVerified(false);
    }
    const onVerifyMobile = () => {
        console.log(user.email);
        setMobileVerified(true);
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Insured Risks', path: '/risk' },
                        // { name: 'Table' },
                    ]}
                />
            </div>
            {/* <H4>Insured Risks</H4> */}
            <div style={{padding: '20px 10px', maxWidth: '900px', margin: 'auto'}}>
                <Grid container >
                    <Grid item xs={5} sm={4} md={4}>
                        <RiskCard 
                            img = {img_icon}
                            paragraph = {'Life Insurance'}
                            budget = {1200}/>
                    </Grid>
                    <Grid item xs={7} sm={8} md={8} >
                        <Paragraph>Description:</Paragraph>
                        <Paragraph2>Life insurance pays out on the event of your death to people listed on beneficaries:</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Probability of Occurance:</Paragraph>
                        <Paragraph2>100%</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Payouts:</Paragraph>
                        <Paragraph2>100K-1M(You choose)</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Payouts Triggers:</Paragraph>
                        <Paragraph2>Smart Contracts releases payment to your --account upon confirmation of death notice in your country of residence's
                            public record. Your family/next of kin can also notify us.
                        </Paragraph2>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Box py="30px" />
                    </Grid>
                    
                    <Grid item xs={5} sm={4} md={4}>
                        <RiskCard 
                            img = {img_icon}
                            paragraph = {'Life Insurance'}
                            budget = {1200}/>
                    </Grid>
                    <Grid item xs={7} sm={8} md={8} >
                        <Paragraph>Description:</Paragraph>
                        <Paragraph2>Life insurance pays out on the event of your death to people listed on beneficaries:</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Probability of Occurance:</Paragraph>
                        <Paragraph2>100%</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Payouts:</Paragraph>
                        <Paragraph2>100K-1M(You choose)</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Payouts Triggers:</Paragraph>
                        <Paragraph2>Smart Contracts releases payment to your --account upon confirmation of death notice in your country of residence's
                            public record. Your family/next of kin can also notify us.
                        </Paragraph2>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Box py="30px" />
                    </Grid>
                    <Grid item xs={5} sm={4} md={4}>
                        <RiskCard 
                            img = {img_icon}
                            paragraph = {'Life Insurance'}
                            budget = {1200}/>
                    </Grid>
                    <Grid item xs={7} sm={8} md={8} >
                        <Paragraph>Description:</Paragraph>
                        <Paragraph2>Life insurance pays out on the event of your death to people listed on beneficaries:</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Probability of Occurance:</Paragraph>
                        <Paragraph2>100%</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Payouts:</Paragraph>
                        <Paragraph2>100K-1M(You choose)</Paragraph2>
                        <Box py="5px" />
                        <Paragraph>Payouts Triggers:</Paragraph>
                        <Paragraph2>Smart Contracts releases payment to your --account upon confirmation of death notice in your country of residence's
                            public record. Your family/next of kin can also notify us.
                        </Paragraph2>
                    </Grid>
                </Grid>                
            </div>
        </Container>
    )
}

export default InsuredRisk
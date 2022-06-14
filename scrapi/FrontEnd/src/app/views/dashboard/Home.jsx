import React, { Fragment } from 'react'
import RowCards from './shared/RowCards'
import StatCards from './shared/StatCards'
import Campaigns from './shared/Campaigns'
import StatCards2 from './shared/StatCards2'
import DoughnutCard from './shared/DoughnutCard'
import UpgradeCard from './shared/UpgradeCard'
import RiskCard from './shared/RiskCard'
import StayCard from './shared/StayCard'
import { styled, useTheme } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import TopSellingTable from './shared/TopSellingTable'
import img_addUmbrella from '../../../assets/addUmbrella.png'
import img_affection from '../../../assets/affection.png'
import img_human from '../../../assets/human.png'
import img_stay1 from '../../../assets/stay1.png'
import img_stay2 from '../../../assets/stay2.png'
import img_stay3 from '../../../assets/stay3.png'
import {
    Grid,
    Card,
    MenuItem,
    Select,
} from '@mui/material'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    paddingTop: '60px',
    paddingBottom: '10px',
    color: theme.palette.text.primary,
}))

const Home = () => {
    const { palette } = useTheme()
    const { logout, user } = useAuth()
    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="greeting">
                            <h4 className='Float-logo' alt='logo'> Hello Mr {user.username} </h4>
                        </div>                        
                        <H4>Insured Risks</H4>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <RiskCard 
                                    img = {img_addUmbrella}
                                    paragraph = {'Life Insurance'}
                                    budget = {1200}/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <RiskCard 
                                    img = {img_affection}
                                    paragraph = {'Critical Illness Insurance'}
                                    budget = {150}/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <RiskCard 
                                    img = {img_human}
                                    paragraph = {'Personal Accident Insurance'}
                                    budget = {1500}/>
                            </Grid>
                        </Grid>
                        <H4>Community Data</H4>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
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
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
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
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <DoughnutCard 
                                    name = {'Pending'}
                                    data={[
                                        {
                                            value: 35,
                                            name: 'pending',
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
                        <H4>Stay Connected</H4>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <StayCard 
                                    img = {img_stay1}
                                    date = {'8th Feb 2022'}
                                    label = {'Announcements'}/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <StayCard 
                                    img = {img_stay2}
                                    date = {'8th Feb 2022'}
                                    label = {'Announcements'}/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <StayCard 
                                    img = {img_stay3}
                                    date = {'8th Feb 2022'}
                                    label = {'Announcements'}/>
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid>
            </ContentBox>
        </Fragment>
    )
}

export default Home

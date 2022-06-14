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
    paddingBottom: '10px',
    color: theme.palette.text.primary,
}))

const Paragraph2 = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    fontSize: '14px',
    paddingBottom: '10px',
    color: theme.palette.text.secondary,
}))

const ProfilePage = () => {
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
                        { name: 'Profile', path: '/profile' },
                    ]}
                />
            </div>
            <H4>Profile Information</H4>
            <div style={{padding: '20px 10px', maxWidth: '900px', margin: 'auto'}}>                
                <Grid container >
                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Name</Paragraph>
                        {
                            name_editable == true?
                            <TextField id="name" defaultValue={name} variant="standard" onChange= {onChangeName}/>
                            :
                            <Paragraph2>{name}</Paragraph2>
                        }
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        {
                            name_editable == true ?
                            <Button onClick={() => setNameEditable(false)} style={{marginTop: '20px'}}> Update </Button>
                            :
                            <Button onClick={() => setNameEditable(true)} style={{marginTop: '20px'}}> Edit Name</Button>
                        }
                    </Grid>
                </Grid>
                <Box py="50px" />
                <Grid container >
                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Email
                            {
                                email_verified == true ?
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#bcedb7'}}>Verified</span>
                                :
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#edb7c5'}}>Not Verified</span>
                            }
                            
                        </Paragraph>
                        {
                            email_editable == true?
                            <TextField id="email" defaultValue={email} variant="standard" onChange= {onChangeEmail}/>
                            :
                            <Paragraph2>{email}</Paragraph2>
                        }
                    </Grid>
                    <Grid item  xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        {
                            email_verified == true ?
                            <></>
                            :
                            <Button onClick={onVerifyEmail} style={{marginTop: '20px'}}> Verifiy Email </Button>
                        }
                        
                        {
                            email_editable == true ?
                            <Button onClick={() => setEmailEditable(false)} style={{marginTop: '20px'}}> Update </Button>
                            :
                            <Button onClick={() => setEmailEditable(true)} style={{marginTop: '20px'}}> Edit Email</Button>
                        }
                    </Grid>
                </Grid>
                <Box py="50px" />
                <Grid container >
                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Mobile
                            {
                                mobile_verified == true ?
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#bcedb7'}}>Verified</span>
                                :
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#edb7c5'}}>Not Verified</span>
                            }
                            
                        </Paragraph>
                        {
                            mobile_editable == true?
                            <TextField id="mobile" defaultValue={mobile} variant="standard" onChange= {onChangeMobile}/>
                            :
                            <Paragraph2>{mobile}</Paragraph2>
                        }
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        {
                            mobile_verified == true ?
                            <></>
                            :
                            <Button onClick={onVerifyMobile} style={{marginTop: '20px'}}> Verifiy Mobile </Button>
                        }
                        
                        {
                            mobile_editable == true ?
                            <Button onClick={() => setMobileEditable(false)} style={{marginTop: '20px'}}> Update </Button>
                            :
                            <Button onClick={() => setMobileEditable(true)} style={{marginTop: '20px'}}> Edit Mobile</Button>
                        }
                    </Grid>
                </Grid>
            </div>
            
            
        </Container>
    )
}

export default ProfilePage

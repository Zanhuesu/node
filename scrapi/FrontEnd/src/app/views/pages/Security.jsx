import React, { useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import {
    Grid,
    TextField,
    Card,
    MenuItem,
    Select,
    Switch,
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

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    paddingBottom: '10px',
    fontSize: '1rem',
    color: theme.palette.text.primary,
}))

const Paragraph2 = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold',
    fontSize: '0.9rem',
    paddingBottom: '10px',
    color: theme.palette.text.secondary,
}))



const Security = () => {
    const [twoFA_enabled, setTwoFAEnabled] = useState(false);
    const [whitelist_enabled, setWhiteListEditabled] = useState(false);
    const [email_verified, setEmailVerified] = useState(false);

    const showLoginInfoModal = () => {
        console.log("Show Login Infor Modal")
    }
    const show2FASettingModal = () => {
        console.log("Show Two FA setting Modal")
    }
    const showAddressModal = () => {
        console.log("Show Address Modal")
    }
    
    const showPWDChangeModal = () => {
        console.log("Show Password change modal")
    }

    const handleChange = (event) => {
        setTwoFAEnabled(event.target.checked)
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Security', path: '/security' },
                        // { name: 'Table' },
                    ]}
                />
            </div>
            <div style={{padding: '20px 10px', maxWidth: '900px', margin: 'auto'}}>                
                <Grid container >
                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Login Information</Paragraph>
                        <Paragraph2>Change your password, see your account e-mail details, and monitor the logins to your account</Paragraph2>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        <Button onClick={() => showLoginInfoModal(true)} style={{marginTop: '20px'}}> Login Information</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Box py="20px" />
                    </Grid>

                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Two-Factor Authentication
                            {
                                twoFA_enabled == true ?
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#bcedb7'}}>2FA Enabled</span>
                                :
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#edb7c5'}}>2FA Not Enabled</span>
                            }
                            
                        </Paragraph>
                        <Paragraph2>Used for withdrawals and changes to security settings</Paragraph2>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        <Button onClick={() => show2FASettingModal(true)} style={{marginTop: '20px'}}> 2FA Settings</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Box py="20px" />
                    </Grid>

                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Address Book
                            {
                                whitelist_enabled == true ?
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#bcedb7'}}>Whitelisting On</span>
                                :
                                <span style={{marginLeft: '10px', padding: '1px 10px', fontSize: '12px', borderRadius: '3px', backgroundColor: '#edb7c5'}}>Whitelisting Off</span>
                            }
                            
                        </Paragraph>
                        <Paragraph2>Manage Crypto Addresses for easier and more secure withdrawals</Paragraph2>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        <Button onClick={() => showAddressModal(true)} style={{marginTop: '20px'}}> Address Book</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Box py="40px" />
                    </Grid>

                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Password</Paragraph>
                        <Paragraph2>Choose a strong password to keep your account safe</Paragraph2>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        <Button onClick={() => showPWDChangeModal(true)} style={{marginTop: '20px'}}>Change Password</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Box py="20px" />
                    </Grid>

                    <Grid item xs={12} sm={8} md={8}>
                        <Paragraph>Two-Factor authentication (2FA)</Paragraph>
                        <Paragraph2>2FA adds a layer sucurity that requries and additional authentication method to log in
                            <span style={{marginLeft: '10px', padding: '1px 10px', color: '#2c5fef' }}><a href="#">Learn more</a></span>
                        </Paragraph2>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} style={{textAlign: 'right'}}>
                        <Switch
                            checked={twoFA_enabled}
                            onChange={handleChange}
                            value="twoFA_enabled"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Grid>



                </Grid>
                <Box py="50px" />
            </div>
        </Container>
    )
}

export default Security

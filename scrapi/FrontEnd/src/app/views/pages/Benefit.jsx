import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    Autocomplete,
} from '@mui/material'
import { Paragraph, Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
const relations = [
    { label: 'Super Admin' },
    { label: 'Admin' },
    { label: 'Manager' },
    { label: 'Customer' },
]
const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
]

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '50px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '30px',
        },
    },
}))

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))

const BenefitPage = () => {
    const [state, setState] = useState({
        date: new Date(),
    })

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }

    const {
        username,
        fullname,
        creditCard,
        mobile,
        password,
        confirmPassword,
        gender,
        date,
        email,
    } = state

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Beneficaries', path: '/benefit' },
                        // { name: 'Table' },
                    ]}
                />
            </div>
            <div style={{padding: '20px 10px', maxWidth: '900px', margin: 'auto'}} className={'formfields'}>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }} >
                        <Grid item md={3} xs={3} sm={3} lg={3}>
                            <Paragraph>Full Name:</Paragraph>
                        </Grid>
                        <Grid item md={9} xs={9} sm={9} lg={9}>
                            <TextField
                                // label="First Name"
                                onChange={handleChange}
                                type="text"
                                name="fullname"
                                value={fullname || ''}
                                validators={['required']}
                                size="small"
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item md={3} xs={3} sm={3} lg={3}>
                            <Paragraph>Birth Date:</Paragraph>
                        </Grid>
                        <Grid item md={9} xs={9} sm={9} lg={9}>
                            <div style={{width: '200px'}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={date}
                                        onChange={handleDateChange}
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                // variant="Outlined"
                                                id="mui-pickers-date"
                                                // label="Date picker"
                                                sx={{ mb: 2, width: '100%' }}
                                                size="small"
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        </Grid>

                        <Grid item md={3} xs={3} sm={3} lg={3}>
                            <Paragraph>Relationship:</Paragraph>
                        </Grid>
                        <Grid item md={9} xs={9} sm={9} lg={9}>
                            <Autocomplete
                                options={relations}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Combo box"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item md={3} xs={3} sm={3} lg={3}>
                            <Paragraph>Email:</Paragraph>
                        </Grid>
                        <Grid item md={9} xs={9} sm={9} lg={9}>
                            <TextField
                                // label="Email"
                                onChange={handleChange}
                                type="text"
                                name="email"
                                value={email || ''}
                                validators={['required']}
                                size="small"
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item md={3} xs={3} sm={3} lg={3}>
                            <Paragraph>Mobile:</Paragraph>
                        </Grid>
                        <Grid item md={9} xs={9} sm={9} lg={9}>
                            <TextField
                                // label="First Name"
                                onChange={handleChange}
                                type="text"
                                name="mobile"
                                value={mobile || ''}
                                validators={['required']}
                                size="small"
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item md={3} xs={3} sm={3} lg={3}>
                            <Paragraph>Country of Residence:</Paragraph>
                        </Grid>
                        <Grid item md={9} xs={9} sm={9} lg={9}>
                            <Autocomplete
                                options={suggestions}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Combo box"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    
                    <Button style={{marginTop: '20px', float: 'right'}} color="primary" variant="contained" type="submit">
                        <Icon>done</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </div>
        </Container>
        
    )
}

export default BenefitPage


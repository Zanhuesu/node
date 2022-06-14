import React from 'react'
import fetch from 'cross-fetch'
import { TextField, CircularProgress, Autocomplete } from '@mui/material'
import { styled } from '@mui/system'

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    paddingTop: 10
}))

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

export default function AsyncAutocomplete({getUUID}) {
    const [open, setOpen] = React.useState(false)
    const [options, setOptions] = React.useState([])
    const [keyword, setKeyword] = React.useState();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        let active = true
        console.log(keyword);
        if (!loading) {
            return undefined
        }

        ; (async () => {
            const response = await fetch(
                
                'http://localhost:8000/api/getname2?name=' + keyword
                // 'http://34.239.122.150/api/getname2?name=' + keyword
            )
            await sleep(1e3) // For demo purposes.
            const scgcards = await response.json()
            console.log(scgcards);  
            
            let nameOptions =  scgcards.map((name) => {return {'name': name}});
            if (active) {
                setOptions(
                    nameOptions
                )
                setLoading(false);
            }

            // let countries = [{name:'Rumor'}, {name:'Mana Crypto'}, {name:'Force of will'}];
            // if (active) {
            //     setOptions(countries);
            // }
        })()
        setLoading(false);
        return () => {
            active = false
        }
        
    }, [keyword])

    React.useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    const onKeyPress = (e) => {
        setKeyword(e.target.value);
        setLoading(true);
        if(e.keyCode == 13){
            // setKeyword(e.target.value);
            // setLoading(true);
            // console.log(e.target.value);
         }
        
    }

    const handleOptionSelected = (event,value, reason) => {
        if (reason === 'selectOption') {
          // do the rest
          let name_key = value.name.replace(" (Foil)", "");
          getUUID(name_key, '');

            // getUUID(keyword);
        };
      };

    return (
        <AutoComplete
            id="asynchronous-demo"
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            onChange={handleOptionSelected}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onKeyDown={onKeyPress}
                    label="Search by Card Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}

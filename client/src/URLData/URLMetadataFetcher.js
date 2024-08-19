//Web url filling form for information request.
//and viewing the received information

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
//mui
import { TextField, Button, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

//mui icons
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { getDataFromServer } from './URLMetadataApi.js';
import SignleUrlData from './SignleUrlData.js';

//BG color
import bgColor from './imges/formBGColor.jpeg'


// Define the validation schema with custom error messages
const schema = Joi.object({
    urls: Joi.array()
        .items(Joi.string().uri({ allowRelative: false }).message('Each URL must be a valid URL.'))
        .min(1)
        .required()
        .messages({
            'array.base': 'URLs must be an array of strings.',
            'array.min': 'At least one URL is required.',
            'any.required': 'The URL list is required.'
        })
});

const URLMetadataFetcher = () => {
    const [allResults, setAllResults] = useState([]);//An array for the information received from the server
    const [loading, setLoading] = useState(false); // Loading state

    const { handleSubmit, control, setValue,reset, getValues, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
        defaultValues: { urls: ['', '', ''] } // Default 3 inputs
    });

    const handleAddInput = () => {
        const currentUrls = getValues('urls');
        if (currentUrls.length < 10) { // Limit to 10 inputs
            setValue('urls', [...currentUrls, '']);
        }
    };

    const restartPage=()=>{
        setAllResults([]);
    }

    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        try {
            const response = await getDataFromServer(data.urls);
            setAllResults(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    load<CircularProgress />
                </Box>
            ) : allResults.length === 0 ? (
                <div style={{ backgroundImage: `url(${bgColor})`, height: '100vh' }}>

                    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            URL Metadata Fetcher
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="urls"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleAddInput}
                                                sx={{ mb: 2 }}
                                            >
                                                Add Input
                                            </Button>
                                        </Box>
                                        {field.value.map((url, index) => (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <TextField
                                                    label={`URL ${index + 1}`}
                                                    variant="outlined"
                                                    fullWidth
                                                    value={url}
                                                    onChange={(e) => {
                                                        const newUrls = [...field.value];
                                                        newUrls[index] = e.target.value;
                                                        field.onChange(newUrls);
                                                    }}
                                                    error={!!errors.urls?.[index]}
                                                    helperText={errors.urls?.[index] ? errors.urls[index].message : ''}
                                                />
                                            </Box>
                                        ))}



                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit
                                        </Button>
                                    </>
                                )}
                            />
                        </form>
                    </Box>
                </div>
            ) : (
                <>
                
                        <Button variant="contained" endIcon={ <ReplayCircleFilledIcon />}  onClick={restartPage}> 
                            Fill again
                        </Button>
                       
             
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mt: 4 }}>
                        {allResults.map((item) => (
                            <SignleUrlData key={item.url} url={item} />
                        ))}
                    </Box>
                </>
            )}
        </>
    );
};

export default URLMetadataFetcher;

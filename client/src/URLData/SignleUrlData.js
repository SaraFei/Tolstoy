//This component displays the details about a single url


import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//defult img
import defaultImg from "./imges/defultImg.jpeg"


const SignleUrlData = ({ url }) => {
    const imageUrl = url.image || defaultImg; // Use default image if url.image is not available

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={imageUrl}
            />
            <CardContent>
                {url.url}
                <Typography gutterBottom variant="h5" component="div">
                    {url.title || 'No Title'} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {url.description || 'No Description'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SignleUrlData;

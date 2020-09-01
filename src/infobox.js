// Infoboxes.js 
// created August 30, 2020
// Emanuel Saunders

//created using rfce/es7
import { Card, CardContent, Typography } from '@material-ui/core'

import React from 'react'

function InfoBox( {title, cases, total}) {
    return (
        <Card className="infobox__title">
            <CardContent> 
                <Typography color="infobox__typography">{title}</Typography>
                <h2 className="infobox__cases">{cases}</h2>
                <Typography color="textSecondary">{total} Total</Typography>
            </CardContent> 
        </Card>
    )
}

export default InfoBox

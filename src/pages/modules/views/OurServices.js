import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const ImageBackdrop = styled('div')(({theme}) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({theme}) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: "/project_pic.jpg",
    title: 'Build Your Project',
    width: '34%',
    containerId: '#build-project-component'
  },
  {
    url: '/home_visit_pic.jpg',
    title: 'Home Visits',
    width: '28%',
    containerId: '#home-visits-component'
  },
  {
    url: '/bill_calculator_pic.jpg',
    title: 'Calculate Home Bill Now',
    width: '38%',
    containerId: '#bill-calculator-component'
  }
];

export default function OurServices() {
  return (
    <Container component="section" sx={{mt: 8, mb: 4}}>
      <Typography variant="h4" marked="center" align="center" component="h2" sx={{fontFamily: 'Montserrat'}}>
        CHECK OUT OUR SERVICES
      </Typography>
      <Box sx={{mt: 4, display: 'flex', flexWrap: 'wrap'}}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop"/>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
                sx={{fontFamily: 'Montserrat'}}
              >
                <a style={{color: "inherit", textDecoration: "none"}} href={image.containerId}>{image.title}</a>
                <div className="imageMarked"/>
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}

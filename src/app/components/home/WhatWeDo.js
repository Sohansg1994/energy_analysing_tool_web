import { Container, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { IMAGES, PATHS } from "../../util/CommonUtil";

const itemData = [
  {
    img: IMAGES.BUILD_PROJECT,
    title: 'BUILD YOUR PROJECT',
    path: '#'
  },
  {
    img: IMAGES.SERVICES,
    title: 'OUR SERVICES',
    path: PATHS.OUR_SERVICES
  },
  {
    img: IMAGES.BILL_CALCULATOR,
    title: 'CALCULATE HOME BILL',
    path: '#simple-calculator'
  },
]

const containerStyles = {
  p: 2,
  textAlign: "center"
}

function WhatWeDo() {
  return (
    <Container sx={containerStyles} maxWidth={false}>
      <ImageList cols={3} gap={20} sx={{ p: 2 }}>
        {itemData.map(item => (
          <ImageListItem
            component="a"
            href={item.path}
            key={item.img}
          >
            <img
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}

export default WhatWeDo;
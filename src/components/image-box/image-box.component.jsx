import React from "react";
import { Wrapper, Overlay, Image, Title, Text, Link } from "./image-box.styles";

const ImageBox = ({image, title, textList, link}) => (
  <Link target="_blank"  rel="noreferrer" href={link}>
    <Wrapper justifyContent="center" marginBottom="2rem" marginRight={['0', "2rem"]} alignItems="center">
      <Overlay flexDirection="column" justifyContent="center" flexWrap="wrap">
        {title && <Title>{title}</Title>}
        {textList && textList.map((text, i) => <Text key={i}>{text}</Text>)}
      </Overlay>
      {image && <Image src={image} alt={`${title && title} logo`} />}
    </Wrapper>
  </Link>
);

export default ImageBox;
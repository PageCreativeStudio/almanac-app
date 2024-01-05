import React, {useEffect, useRef, useState} from 'react';
import { StyledLink, Button, IconWrapper, IconAbsolute, HoverText, DropDown, Option, Wrapper} from './icon-button.styles';
import  useOutsideAlerter from '../../hooks/click-outside-component';


const IconButton = ({children, onClick, link, hoverText, dropdown = null, alert, ...rest}) => {

  const hoverTextRef = useRef(null);
  const wrapperRef = useRef(null);

  const [hoverTextWidth, setHoverTextWidth] = useState(0);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  // Run outside click function
  useOutsideAlerter(wrapperRef, () => {
    setIsDropdownActive(false)
  });
  
  useEffect(() => {
    if(hoverTextRef) {
      if(hoverTextRef.current) {
        setHoverTextWidth(hoverTextRef.current.offsetWidth)
      }
    }

  }, [hoverTextRef])

  const handleDropdownClick = () => {
    setIsDropdownActive(!isDropdownActive)
  }

  return (
    <>
      {
        // Check if its a link or just a button - We are are passing down props and also spreading in anything else the developer might need (e.g custom attributes)
        link ?
          <StyledLink alert={alert} hoverText={hoverText} hoverTextWidth={hoverTextWidth} to={link} {...rest}>
            <IconWrapper><IconAbsolute>{children}</IconAbsolute></IconWrapper>
            <HoverText ref={hoverTextRef}>{hoverText}</HoverText>
          </StyledLink>
        :
          <Wrapper ref={wrapperRef}>
            <Button alert={alert} hoverText={hoverText} hoverTextWidth={hoverTextWidth} dropdownActive={isDropdownActive} onClick={dropdown ? handleDropdownClick : onClick} {...rest}>
              <IconWrapper><IconAbsolute>{children}</IconAbsolute></IconWrapper>
              <HoverText ref={hoverTextRef}>{hoverText}</HoverText>
            </Button>
            {dropdown && <DropDown alignRight={dropdown.alignRight} dropdownActive={isDropdownActive}>
              {dropdown.options.map((text, i) => <Option key={i}>
                {text}
              </Option>)}
            </DropDown>}
          </Wrapper>
      }
    </>
  );
}

export default IconButton;
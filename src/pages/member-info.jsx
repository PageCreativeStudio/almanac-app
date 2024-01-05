import React from "react";
import { Box, Flex } from "reflexbox";
import { PText } from "../components/styles";
import { useLocation, useNavigate  } from 'react-router-dom';
import { Profile } from "../components/profile";

const MemberInfo = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const {text, image, title, role} = location.state
  return (
    <Flex flexWrap="wrap" marginBottom="5rem">
      <Flex width="100%" marginBottom="2rem" justifyContent="flex-end">
        <svg onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" width="49" height="50" viewBox="0 0 49 50">
          <g id="Group_118" data-name="Group 118" transform="translate(-0.955)">
            <rect id="Rectangle_18" data-name="Rectangle 18" width="49" height="50" transform="translate(0.955)" fill="none"/>
            <line id="Line_6" data-name="Line 6" x1="34" transform="translate(7.955 25)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path id="Path_10" data-name="Path 10" d="M53.992,56,40,69.992,53.992,83.984" transform="translate(-32.021 -45.117)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        </svg>
      </Flex>
      <Box width={["100%", "35%", '25%']} marginBottom="3rem"  paddingRight={["0", "2rem", "3rem"]}>
        <Profile
          title={title}
          text={role && role}
          image={image}
        />
      </Box>
      <Box width={["100%", "65%", '75%']}>
       <PText  dangerouslySetInnerHTML={{__html: text}} />
      </Box>
    </Flex>
  );
}

export default MemberInfo;
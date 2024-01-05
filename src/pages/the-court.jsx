import React, { useState } from "react";
import { Profile } from "../components/profile";
import { H1Title } from "../components/styles";
import profilePlaceholder from '../assets/images/person-icon.png';
import { Slider } from "../components/slider";
import getData from "../helpers/get-data";
import { Box, Flex } from "reflexbox";
import { InfoCard } from "../components/info-card";
import Accordian from "../components/accordian/accordian.component";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";


const OfficersAndTheCourt = () => {

  const [officersData, setOfficersData] = useState(null)

  // Fetch areas
  useEffectOnce(() => {
    getData(null, 364, setOfficersData).catch(console.error)
  }, [])

  return (
    <>
      {!officersData ?
       <Loading />
      :
      <>
      <H1Title>
        {(officersData && officersData.acf) && officersData.acf.carousel_title}
      </H1Title>
      {(officersData && officersData.acf) &&
        <Slider
          label= {officersData.acf.carousel_title && officersData.acf.carousel_title}
          slides={officersData.acf.carousel && officersData.acf.carousel.map(({acf: {name, phone_1, phone_2, email, roles, image, description}}) => 
            <Profile key={name}
              width="100%"
              title={name}
              text={roles && roles[0].role}
              image={image ? image.url : profilePlaceholder}
              dropdownOptions={(phone_1 || phone_2 || email) && [
                phone_1,
                phone_2,
                email
              ]}
              link="/member"
              moreInfo={description ? description : null}
            />)}
        />}
        <H1Title>
          {(officersData && officersData.acf) && officersData.acf.members_title}
        </H1Title>
        <Flex flexWrap="wrap" marginBottom="5rem">
          {(officersData && officersData.acf && officersData.acf.areas) && <Box width={['100%']}> 
            {officersData.acf.areas.map(({title, infobox_text, members}) =>
              <Accordian key={title} title={title} infoBox={infobox_text}>
                {members && <Flex flexWrap="wrap">
                  {members.map(({acf: {name, phone_1, phone_2, email, roles}}, i) => <InfoCard key={name}
                    primary={false}
                    width={['100%', '100%', '100%', 'calc(50% - 2rem)']}
                    title={name}
                    phone1={phone_1}
                    phone2={phone_2}
                    email={email}
                    textList={roles && roles.map(role => role.role)}
                  />)}
                </Flex>}
              </Accordian>)}
          </Box>}
        </Flex>
      </>
      }
    </>
  );
}

export default OfficersAndTheCourt;
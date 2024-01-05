import React, { useState } from "react";
import { Box, Flex } from "reflexbox";
import { H1Title, PText, LightText, Title } from "../components/styles";
import getData from "../helpers/get-data";
import { InfoCard } from "../components/info-card";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";

const Charity = () => {
  
  const [charity, setCharity] = useState(null)

  // Fetch areas
  useEffectOnce(() => {
    getData(null, 1050, setCharity).catch(console.error)
  }, [])

  return (
    <>
    {!charity ?
      <Loading />
    :
   <Box maxWidth="100rem">
      {(charity && charity.acf) && <Box marginBottom="8rem">
        <H1Title>
          LIVERY AND CHARITY ROLES        
        </H1Title>
        <PText>
          {charity.acf.description}
        </PText> 
      </Box>}
      
      {(charity && charity.acf) && charity.acf.contact_office.map(({office, phone, contacts}, i) => <Box width="100%" marginBottom="5rem">
        <Flex alignItems="center" flexWrap="wrap" marginBottom="2rem">
          {office && <Box marginRight="2rem"><Title>{office}</Title></Box>}
          {phone && <LightText>{phone}</LightText>}
        </Flex>
        {contacts && <Flex width="100%" flexWrap="wrap">
          {contacts.map(({acf: {name, phone_1, phone_2, email, roles}}, i) => <InfoCard key={name}
            primary={false}
            width={['100%', '100%', '100%', 'calc(50% - 2rem)']}
            title={name}
            phone1={phone_1}
            phone2={phone_2}
            email={email}
            textList={roles && roles.map(role => role.role)}
          />)}  
        </Flex>}
      </Box>)}
    </Box>
    }
    </>
  );
}

export default Charity;

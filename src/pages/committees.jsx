import React, { useEffect, useState } from "react";
import { Flex, Box } from "reflexbox";
import Accordian from "../components/accordian/accordian.component";
import { InfoCard } from "../components/info-card";
import { InfoPopup } from "../components/info-popup";
import { Loading } from "../components/loading";
import { H1Title } from "../components/styles";
import getData from "../helpers/get-data";
import { useEffectOnce } from "../hooks/use-effect-once";

const Committees = () => {

  const [committees, setCommittees] = useState(null)

  // Fetch page data
  useEffectOnce(() => {
    getData(null, 359, setCommittees).catch(console.error)
  }, [])

  return (
    <>
      {!committees ?
        <Loading />
      :
      (committees && committees.acf) && <H1Title>
        <Flex alignItems="center">
          COMMITTEES 
          <Box marginLeft="1.5rem">
            <InfoPopup width="37rem">
              {committees.acf.infobox_text}
            </InfoPopup>
          </Box>
        </Flex>
      </H1Title>}
      {(committees && committees.acf && committees.acf.areas) && committees.acf.areas.map(({title, member, events}) => <Accordian events={events} key={title} title={title}>
        {member && <Flex flexWrap="wrap">
          {member.map(({acf: {image, name, phone_1, phone_2, email, roles, events}}, i) => <InfoCard key={name}
            primary={false}
            width={['100%', '100%', '100%', 'calc(50% - 2rem)']}
            image={image ? image.url : null}
            title={name}
            phone1={phone_1}
            phone2={phone_2}
            email={email}
            events={events}
            textList={roles && roles.map(role => role.role)}
          />)}
        </Flex>}
      </Accordian>)
      }
    </>
  );
}

export default Committees;
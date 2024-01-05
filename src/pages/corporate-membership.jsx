import React, {useState} from "react";
import { H1Title } from "../components/styles";
import { ImageBox } from "../components/image-box";
import getData from "../helpers/get-data";
import { Flex } from "reflexbox";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";

const CorporateMembership = () => {

  const [corporateMembers, setCorporateMembers] = useState(null)

  // Fetch areas
  useEffectOnce(() => {
    getData(null, 368, setCorporateMembers).catch(console.error)
  }, [])

  return (
    <>
      {!corporateMembers ?
        <Loading/>
      :
      <>
      <H1Title>
        {(corporateMembers && corporateMembers.acf) && corporateMembers.acf.title}
      </H1Title>
      {(corporateMembers && corporateMembers.acf) && 
        <Flex flexWrap="wrap">
          {corporateMembers.acf.members.map(({acf: {name, link, associates, logo}}, i) => 
            <ImageBox key={i}
              title={name}
              link={link}
              textList={associates && associates.map(({text}) => text)}
              image={logo.url}
            />
          )}
        </Flex>
      }
      </>
      }
    </>
  );
}

export default CorporateMembership;
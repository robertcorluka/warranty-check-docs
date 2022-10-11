import * as React from 'react';
import PropTypes from 'prop-types';
import HoverCard from '../HoverCard';
import { Box, CardBody, Text, Heading, Image } from 'grommet';
import { navigate } from '@redocly/ui';

export default function LandingCard({
  titleText,
  bodyText,
  icon,
  path
}) {
  return (
    <HoverCard
      onClick={() => navigate(path)}
    >
      <CardBody>
        <Box
          justify='start'
          align='center'
          gap='large'
          direction="row"
        >
          <Box width='100px'>
          <Image src={icon} />
          </Box>
          <Box >
            <Heading
              margin={{ top: 'none', bottom: 'small' }}
              level='4'
            >
              {titleText}
            </Heading>
            <Text size='large'>
              {bodyText}
            </Text>
          </Box>
        </Box>
      </CardBody>
    </HoverCard>
  );
}

LandingCard.propTypes = {
  titleText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

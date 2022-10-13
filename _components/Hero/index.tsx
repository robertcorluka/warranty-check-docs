import React from "react";
import {
  Grommet,
  Box,
  Text,
  Heading,
  RoutedButton,
  ResponsiveContext,
} from "grommet";
import { hpe } from "grommet-theme-hpe";
import hpeElement from "../../images/HPE_ELEMENT_20210217008_16x9_1600_0_72_RGB.jpg";

export default function Hero() {
  return (
    <Grommet theme={hpe}>
    <ResponsiveContext.Consumer>
      {(size) => {
        return (
            <Box
              align="start"
              justify="start"
              background={{
                dark: true,
                image: `url(${hpeElement})`,
              }}
              pad={{ vertical: "xlarge", horizontal: "small" }}
              height="75vh"
              style={{ minHeight: 550, maxHeight: 900 }}
            >
              <Box
                width={size === "small" ? "100%" : "45%"}
                pad={
                  size === "small" ? { horizontal: "20px" } : { left: "150px" }
                }
              >
                <Heading
                  level="2"
                  margin={{ bottom: "none" }}
                  weight="bold"
                  size="large"
                >
                  Warranty Check API
                </Heading>
                <Text size="xxlarge">Reference Documents</Text>
                <Text size="large" margin={{ vertical: "50px" }}>
                HPE Support Center Warranty Check API (Warranty Check API) is used to retrieve the status of your warranty, including service type and level, coverage dates, deliverables, and other details associated with your warranty.
                </Text>
                <Box width="140px">
                  <RoutedButton
                    primary={true}
                    path="developer-portal"
                    label={
                      <Box>
                        <Text size="large">Get started</Text>
                      </Box>
                    }
                  />
                </Box>
              </Box>
            </Box>
        );
      }}
    </ResponsiveContext.Consumer>
    </Grommet>
  );
}

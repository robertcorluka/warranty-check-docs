import * as React from 'react';
import { Card } from 'grommet';

export default function HoverCard({
  children,
  ...rest
}) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Card
      background="background-front"
      elevation={isFocused ? 'medium' : 'small'}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onMouseOver={() => setIsFocused(true)}
      {...rest}
    >
      {children}
    </Card>
  );
}

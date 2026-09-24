import { Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

export function PageHeading({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  // `title`/`children` are hardcoded English copy on every current call site
  // (this component doesn't call getTranslations, since a Server Component
  // reading next-intl at this level breaks static prerendering under this
  // app's `cacheComponents: true` config). `lang="en"` keeps that copy
  // correctly announced on the `/es` locale (WCAG 3.1.2) until it's translated.
  return (
    <Flex direction="column" gap="2">
      <Heading as="h1" fontSize="3xl" fontWeight="bold" lang="en">
        {title}
      </Heading>
      {children ? (
        <Text color="var(--text-secondary)" lang="en">
          {children}
        </Text>
      ) : null}
    </Flex>
  );
}
